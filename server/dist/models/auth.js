import { Schema, model, Document } from "mongoose";
const userSchema = new Schema({
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
const User = model("User", userSchema);
export default User;
//# sourceMappingURL=auth.js.map