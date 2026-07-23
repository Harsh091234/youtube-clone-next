import type { Request, Response } from "express";
import Download from "../models/download.js";
import User from "../models/auth.js";
import Video from "../models/video.js";
import type { IPlan } from "../models/plan.js";
import  path from "path";
import fs from "fs";

export const downloadVideo = async (req: Request, res: Response) => {
  try {
    const { userId, videoId } = req.body;

    const user = await User.findById(userId).populate("plan");
    const video = await Video.findById(videoId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    const plan = user.plan as IPlan;

    if (!plan.isUnlimited) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const count = await Download.countDocuments({
        user: userId,
        status: "SUCCESS",
        downloadedAt: {
          $gte: today,
        },
      });

      if (count >= plan.dailyDownloadLimit) {
        await Download.create({
          user: userId,
          video: videoId,
          status: "BLOCKED",
          plan: plan._id,
        });

        return res.status(403).json({
          success: false,
          message: "Daily download limit reached",
        });
      }
    }

    await Download.create({
      user: userId,
      video: videoId,
      status: "SUCCESS",
      plan: plan._id,
    });

    const filePath = path.join(process.cwd(), video.filepath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    return res.download(filePath);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};