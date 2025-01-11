import { Schema, model } from "mongoose";

const messageSchema = Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    recieverId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const messageModel = model("Messages", messageSchema);

export default messageModel;
