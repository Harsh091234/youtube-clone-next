import { Document } from "mongoose";
export interface IUser extends Document {
    email: string;
    name?: string;
    channelname?: string;
    description?: string;
    image?: string;
    joinedon: Date;
}
declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default User;
//# sourceMappingURL=auth.d.ts.map