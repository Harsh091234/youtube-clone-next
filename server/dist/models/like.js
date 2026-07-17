import mongoose, { Document, Schema } from "mongoose";
const likeSchema = new Schema({
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
const Like = mongoose.model("like", likeSchema);
export default Like;
//# sourceMappingURL=like.js.map