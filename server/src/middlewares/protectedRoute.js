import jwt from "jsonwebtoken";

const protectedRoute = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token && token.startsWith("Bearer ")) {
    const actualToken = token.split(" ")[1];
    try {
      const decoded = jwt.verify(
        actualToken,
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: "Invalid token" });
          }
          req.user = decoded;
          next();
        }
      );
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default protectedRoute;
