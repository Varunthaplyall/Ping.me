import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);

export default userModel;
