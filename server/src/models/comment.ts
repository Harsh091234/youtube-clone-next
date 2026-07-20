import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  userid: mongoose.Types.ObjectId;
  videoid: mongoose.Types.ObjectId;
  commentbody?: string;
  usercommented?: string;
  commentedon: Date;
  createdAt: Date;
  updatedAt: Date;
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  reports?: {
    user: mongoose.Types.ObjectId;
    reason: string;
    description?: string;
    createdAt: Date;
  }[];
  status: string;
  flagReason: string | null;
  flaggedAt: Date | null;
}

const commentSchema = new Schema<IComment>(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    videoid: {
      type: Schema.Types.ObjectId,
      ref: "videofiles",
      required: true,
    },
    commentbody: {
      type: String,
    },
    usercommented: {
      type: String,
    },
    commentedon: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reports: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        reason: {
          type: String,
          required: true,
          enum: [
            "Spam",
            "Harassment",
            "Hate Speech",
            "Violence",
            "Misinformation",
            "Other",
          ],
        },
        description: {
          type: String,
          default: "",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        // moderation fields
        status: {
          type: String,
          enum: ["approved", "flagged", "removed"],
          default: "approved",
        },

        flagReason: {
          type: String,
          default: null,
        },

        flaggedAt: {
          type: Date,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model<IComment>("comment", commentSchema);

export default Comment;
