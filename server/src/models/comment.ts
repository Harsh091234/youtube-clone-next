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
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model<IComment>("comment", commentSchema);

export default Comment;
