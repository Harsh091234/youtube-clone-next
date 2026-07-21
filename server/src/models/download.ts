import { Schema, model, Document, Types } from "mongoose";

export interface IDownload extends Document {
  user: Types.ObjectId;
  video: Types.ObjectId;
  plan: Types.ObjectId;

  status: "SUCCESS" | "BLOCKED";

  downloadedAt: Date;

  ipAddress?: string;

  device?: string;

  createdAt: Date;
  updatedAt: Date;
}

const DownloadSchema = new Schema<IDownload>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    plan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    status: {
      type: String,
      enum: ["SUCCESS", "BLOCKED"],
      default: "SUCCESS",
    },

    downloadedAt: {
      type: Date,
      default: Date.now,
    },

    ipAddress: {
      type: String,
    },

    device: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Helpful indexes for queries
DownloadSchema.index({ user: 1, downloadedAt: 1 });
DownloadSchema.index({ video: 1 });
DownloadSchema.index({ plan: 1 });

export default model<IDownload>("Download", DownloadSchema);
