import comment from "../models/comment.js";
import mongoose from "mongoose";
import type { Request, Response } from "express";
import { translateText } from "../lib/translate.js";
import { validateComment } from "../lib/validatorHelper.js";

export const postcomment = async (req: Request, res: Response) => {
  const commentdata = req.body;
  const error = validateComment(commentdata.commentbody);
  const newComment = new comment({
    ...commentdata,
  });
  if (error) {
    newComment.status = "flagged";
    newComment.flagReason = error;
    newComment.flaggedAt = new Date();
     await newComment.save();
      return res.status(400).json({
        message:
          "Your comment has been flagged for review and will not be visible until it has been reviewed.",
      }); 
  }

  try {
    newComment.status="approved";
    await newComment.save();
    return res.status(200).json({ comment: newComment});
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getallcomment = async (req: Request, res: Response) => {
  const videoid = req.params.videoid as string;
  try {
    const commentvideo = await comment.find({
      videoid: videoid,
      status: "approved",
    });
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
    const userId = req.body.id.toString();

    const liked = commenttolike.likes.includes(userId);
    const disliked = commenttolike.dislikes.includes(userId);

    if (liked) {
      commenttolike.likes = commenttolike.likes.filter(
        (id) => id.toString() !== userId,
      );
    } else {
      commenttolike.likes.push(userId);

      if (disliked) {
        commenttolike.dislikes = commenttolike.likes.filter(
          (id) => id.toString() !== userId,
        );
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
    const userId = req.body.id.toString();

    const liked = comment1.likes.some((id) => id.toString() === userId);
    const disliked = comment1.dislikes.some((id) => id.toString() === userId);

    if (disliked) {
      comment1.dislikes = comment1.dislikes.filter(
        (id) => id.toString() !== userId,
      );
    } else {
      comment1.dislikes.push(userId);

      if (liked) {
        comment1.likes = comment1.likes.filter(
          (id) => id.toString() !== userId,
        );
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

export const reportComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("id ", id)
    const { userId, reason, description } = req.body;

    const commentToReport = await comment.findById(id);

    if (!commentToReport) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const alreadyReported = commentToReport.reports?.some(
      (report: any) => report.user.toString() === userId,
    );

    if (alreadyReported) {
      return res.status(400).json({
        message: "You have already reported this comment.",
      });
    }

    commentToReport.reports?.push({
      user: userId,
      reason,
      description,
      createdAt: new Date(),
    });

    await commentToReport.save();

    return res.status(200).json({
      message: "Comment reported successfully.",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getFlaggedComments = async (req: Request, res: Response) => {
  try {
    const flaggedComments = await comment
      .find({
        status: "flagged",
      })
      .sort({
        flaggedAt: -1,
      });

    return res.status(200).json({
      success: true,
      comments: flaggedComments,
    });
  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};

export const approveComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedComment = await comment.findByIdAndUpdate(
      id,
      {
        status: "approved",
        flagReason: null,
        flaggedAt: null,
      },
      {
        new: true,
      },
    );

    if (!updatedComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment approved.",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
