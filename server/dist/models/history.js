import mongoose, { Schema, Document } from "mongoose";
const historySchema = new Schema({
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
const History = mongoose.model("history", historySchema);
export default History;
//# sourceMappingURL=history.js.map