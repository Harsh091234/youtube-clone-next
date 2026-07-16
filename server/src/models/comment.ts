import mongoose, { Schema, Document } from "mongoose";

export interface IWatchLater extends Document {
  viewer: mongoose.Types.ObjectId;
  videoid: mongoose.Types.ObjectId;
  likedon: Date;
}

const watchLaterSchema = new Schema<IWatchLater>(
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

export default mongoose.model<IWatchLater>("watchlater", watchLaterSchema);
