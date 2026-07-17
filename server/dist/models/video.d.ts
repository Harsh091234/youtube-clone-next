import mongoose, { Document } from "mongoose";
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
declare const Video: mongoose.Model<IVideo, {}, {}, {}, Document<unknown, {}, IVideo, {}, mongoose.DefaultSchemaOptions> & IVideo & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IVideo>;
export default Video;
//# sourceMappingURL=video.d.ts.map