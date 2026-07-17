import mongoose, { Document } from "mongoose";
export interface IComment extends Document {
    userid: mongoose.Types.ObjectId;
    videoid: mongoose.Types.ObjectId;
    commentbody?: string;
    usercommented?: string;
    commentedon: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const Comment: mongoose.Model<IComment, {}, {}, {}, Document<unknown, {}, IComment, {}, mongoose.DefaultSchemaOptions> & IComment & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IComment>;
export default Comment;
//# sourceMappingURL=comment.d.ts.map