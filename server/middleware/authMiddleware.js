import jwt from 'jsonwebtoken'; 
import asyncHandler from 'express-async-handler'; 
import User from '../models/userSchema.js'; // Add this import

// export const protect = asyncHandler(async (req, res, next) => {
//     let token;

//     if (
//         req.headers.authorization && req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
            
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             console.error(error);
//             res.status(401);
//             throw new Error('Not authorized, token failed.');
//         }
//     };

//     if (!token) {
//         res.status(401);
//         throw new Error('Not authorized, no token');
//     }
// });

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }

      next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        
      if (error.name === "JsonWebTokenError") {
        res.status(401);
        throw new Error("Invalid token");
      } else if (error.name === "TokenExpiredError") {
        res.status(401);
        throw new Error("Token expired");
      } else {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
}; 
