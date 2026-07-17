import mongoose, { Document } from "mongoose";
export interface ILike extends Document {
    viewer: mongoose.Types.ObjectId;
    videoid: mongoose.Types.ObjectId;
    likedon: Date;
}
declare const Like: mongoose.Model<ILike, {}, {}, {}, Document<unknown, {}, ILike, {}, mongoose.DefaultSchemaOptions> & ILike & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILike>;
export default Like;
//# sourceMappingURL=like.d.ts.map