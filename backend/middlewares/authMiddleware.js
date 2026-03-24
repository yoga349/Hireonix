//protecting routes
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // your user model

export const protect = async (req, res, next) => {
  let token;

  // 1. Get token from headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    
    try {
      // 2. Extract token
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Get user from DB (excluding password)
      req.user = await User.findById(decoded.userId).select("-password");

      // 5. Move to next function
      next();

    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }

  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};