import type { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/auth.js";
import Plan from "../models/plan.js";

export const login = async (req: Request, res: Response) => {
    const { email, name, image } = req.body;

  try {
    const freePlan = await Plan.findOne({ name: "Free" });

    if (!freePlan) {
      return res.status(500).json({
        message: "Default plan not found",
      });
     
    }

    let user = await User.findOne({ email });

    
    if (!user) {
      user = await User.create({
        email,
        name,
        image,
        plan: freePlan._id,
      });

      res.status(201).json({ result: user });
      return;
    }

    if (!user.plan) {
      user.plan = freePlan._id;
      await user.save();
    }

  
    const populatedUser = await User.findById(user._id).populate("plan");

    res.status(200).json({
      result: populatedUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id  = req.params.id as string;
  const { channelname, description, preferredLanguage } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "User unavailable..." });
    return;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          channelname,
          description,
          preferredLanguage,
        },
      },
      { returnDocument: "after" },
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
