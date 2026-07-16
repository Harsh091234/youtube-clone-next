import mongoose, { Document, Schema } from "mongoose";

export interface ILike extends Document {
  viewer: mongoose.Types.ObjectId;
  videoid: mongoose.Types.ObjectId;
  likedon: Date;
}

const likeSchema = new Schema<ILike>(
  {
    viewer: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    videoid: {
      type: Schema.Types.ObjectId,
      ref: "videofiles",
      required: true,
    },
    likedon: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Like = mongoose.model<ILike>("like", likeSchema);

export default Like;
