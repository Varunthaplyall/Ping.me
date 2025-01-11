import joi from "joi";

const registerSchema = joi.object({
  userName: string().required(),
  email: string().email().required(),
  password: string().min(4).required(),
});

export default registerSchema;
