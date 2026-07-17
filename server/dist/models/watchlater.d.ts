import mongoose, { Document } from "mongoose";
export interface IWatchLater extends Document {
    viewer: mongoose.Types.ObjectId;
    videoid: mongoose.Types.ObjectId;
    likedon: Date;
}
declare const WatchLater: mongoose.Model<IWatchLater, {}, {}, {}, Document<unknown, {}, IWatchLater, {}, mongoose.DefaultSchemaOptions> & IWatchLater & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWatchLater>;
export default WatchLater;
//# sourceMappingURL=watchlater.d.ts.map