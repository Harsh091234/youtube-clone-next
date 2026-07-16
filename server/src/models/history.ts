import mongoose, { Schema, Document } from "mongoose";

export interface IHistory extends Document {
  viewer: mongoose.Types.ObjectId;
  videoid: mongoose.Types.ObjectId;
  likedon: Date;
}

const historySchema = new Schema<IHistory>(
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

const History = mongoose.model<IHistory>("history", historySchema);

export default History;
