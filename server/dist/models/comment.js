import mongoose, { Schema, Document } from "mongoose";
const commentSchema = new Schema({
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
}, {
    timestamps: true,
});
const Comment = mongoose.model("comment", commentSchema);
export default Comment;
//# sourceMappingURL=comment.js.map