import { sign } from "jsonwebtoken";

const createToken = (payload) => {
  return sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export default createToken;
