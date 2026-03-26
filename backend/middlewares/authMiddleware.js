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
      console.log("DECODED:", decoded);
      // 4. Get user from DB (excluding password)
      req.user = await User.findById(decoded.userId).select("-password");
      console.log("USER FROM DB:", user);
      // 5. Move to next function
      next();
      console.log("AUTH HEADER:", req.headers.authorization);







req.user = user;

    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }

  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};