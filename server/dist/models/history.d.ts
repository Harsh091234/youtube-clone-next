import mongoose, { Document } from "mongoose";
export interface IHistory extends Document {
    viewer: mongoose.Types.ObjectId;
    videoid: mongoose.Types.ObjectId;
    likedon: Date;
}
declare const History: mongoose.Model<IHistory, {}, {}, {}, Document<unknown, {}, IHistory, {}, mongoose.DefaultSchemaOptions> & IHistory & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IHistory>;
export default History;
//# sourceMappingURL=history.d.ts.map