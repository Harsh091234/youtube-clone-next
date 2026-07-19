import type { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/auth.js";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, name, image } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const newUser = await User.create({
        email,
        name,
        image,
      });

      res.status(201).json({ result: newUser });
      return;
    }

    res.status(200).json({ result: existingUser });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
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
