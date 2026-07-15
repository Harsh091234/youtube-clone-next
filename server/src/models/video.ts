import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  videotitle: string;
  filename: string;
  filetype: string;
  filepath: string;
  filesize: string;
  videochanel: string;
  Like: number;
  views: number;
  uploader?: string;
}

const videoSchema = new Schema<IVideo>(
  {
    videotitle: { type: String, required: true },
    filename: { type: String, required: true },
    filetype: { type: String, required: true },
    filepath: { type: String, required: true },
    filesize: { type: String, required: true },
    videochanel: { type: String, required: true },
    Like: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    uploader: { type: String },
  },
  {
    timestamps: true,
  },
);

const Video = mongoose.model<IVideo>("videofiles", videoSchema);

export default Video;
