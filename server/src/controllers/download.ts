
import type { Request, Response } from "express";
import Download from "../models/download.js";
import User from "../models/auth.js";
export const downloadVideo = async (req: Request, res: Response) => {
  try {
    const { userId, videoId } = req.body;

    const user = await User.findById(userId).populate("plan");

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    if (!user.plan?.isUnlimited) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const count = await Download.countDocuments({
        user: userId,

        status: "SUCCESS",

        downloadedAt: {
          $gte: today,
        },
      });

      if (count >= user?.plan?.dailyLimit) {
        await Download.create({
          user: userId,
          video: videoId,
          status: "BLOCKED",
        });

        return res.status(403).json({
          message: "Daily limit reached",
        });
      }
    }

    await Download.create({
      user: userId,
      video: videoId,
      status: "SUCCESS",
    });

    res.json({
      success: true,
      message: "Download allowed",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
