import mongoose, { Schema, Document } from "mongoose";
const watchLaterSchema = new Schema({
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
}, {
    timestamps: true,
});
const WatchLater = mongoose.model("watchlater", watchLaterSchema);
export default WatchLater;
//# sourceMappingURL=watchlater.js.map