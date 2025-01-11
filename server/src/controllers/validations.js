import { validate } from "../models/user.model";

const userValidator = (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log("Error ocurred while validating user :", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default userValidator;
