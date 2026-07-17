import mongoose, { Document, Schema } from "mongoose";
const videoSchema = new Schema({
    videotitle: { type: String, required: true },
    filename: { type: String, required: true },
    filetype: { type: String, required: true },
    filepath: { type: String, required: true },
    filesize: { type: String, required: true },
    videochanel: { type: String, required: true },
    Like: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    uploader: { type: String },
}, {
    timestamps: true,
});
const Video = mongoose.model("videofiles", videoSchema);
export default Video;
//# sourceMappingURL=video.js.map