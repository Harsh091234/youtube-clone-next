import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name?: string;
  channelname?: string;
  description?: string;
  image?: string;
  joinedon: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  channelname: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  joinedon: {
    type: Date,
    default: Date.now,
  },
});

const User = model<IUser>("User", userSchema);

export default User;
