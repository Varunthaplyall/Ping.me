import { object, string } from "joi";

const registerSchema = object({
  userName: string().required(),
  email: string().email().required(),
  password: string().min(4).required(),
});

export default registerSchema;
