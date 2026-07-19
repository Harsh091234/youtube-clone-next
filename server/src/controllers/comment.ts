import comment from "../models/comment.js";
import mongoose from "mongoose";
import type { Request, Response } from "express";
import { translateText } from "../lib/translate.js";

export const postcomment = async (req: Request, res: Response) => {
  const commentdata = req.body;
  const postcomment = new comment(commentdata);
  try {
    await postcomment.save();
    return res.status(200).json({ comment: true });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getallcomment = async (req: Request, res: Response) => {
  const videoid = req.params.videoid as string;
  try {
    const commentvideo = await comment.find({ videoid: videoid });
    return res.status(200).json(commentvideo);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const deletecomment = async (req: Request, res: Response) => {
  const { id: _id } = req.params as { id: string };
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("comment unavailable");
  }
  try {
    await comment.findByIdAndDelete(_id);
    return res.status(200).json({ comment: true });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const editcomment = async (req: Request, res: Response) => {
  const { id: _id } = req.params as { id: string };
  const { commentbody } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("comment unavailable");
  }
  try {
    const updatecomment = await comment.findByIdAndUpdate(_id, {
      $set: { commentbody: commentbody },
    });
    res.status(200).json(updatecomment);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const likeComment = async (req: Request, res: Response) => {
  try {
    const { id: commentId } = req.params as { id: string };
    const commenttolike = await comment.findById(commentId);
    if (!commenttolike) {
      return res.status(400).json({ message: "Comment not found" });
    }
    const userId = req.body.id;

    const liked = commenttolike.likes.includes(userId);
    const disliked = commenttolike.dislikes.includes(userId);

    if (liked) {
      commenttolike.likes.pull(userId);
    } else {
      commenttolike.likes.push(userId);

      if (disliked) {
        commenttolike.dislikes.pull(userId);
      }
    }

    await commenttolike.save();
    return res.status(200).json({
      comment: commenttolike,
    });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const dislikeComment = async (req: Request, res: Response) => {
  try {
    const { id: commentId } = req.params as { id: string };
    const comment1 = await comment.findById(commentId);
    if (!comment1) {
      return res.status(400).json({ message: "Comment not found" });
    }
    const userId = req.body.id;

    const liked = comment1.likes.includes(userId);
    const disliked = comment1.dislikes.includes(userId);

    if (disliked) {
      comment1.dislikes.pull(userId);
    } else {
      comment1.dislikes.push(userId);

      if (liked) {
        comment1.likes.pull(userId);
      }
    }

    await comment1.save();
    return res.status(200).json({
      comment: comment1,
    });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const translateComment = async (req: Request, res: Response) => {
  try {
    const { commentId, targetLanguage } = req.body;

    if (!commentId || !targetLanguage) {
      return res.status(400).json({
        message: "commentId and targetLanguage are required",
      });
    }

    const presentcomment = await comment.findById(commentId);

    if (!presentcomment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const translatedText = await translateText(
      presentcomment.commentbody!,
      targetLanguage,
    );

    return res.status(200).json({
      success: true,
      translatedText,
    });
  } catch (error) {
    console.log("Server Error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};