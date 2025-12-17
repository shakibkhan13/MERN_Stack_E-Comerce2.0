import asyncHandler from "express-async-handler"
import User from "../models/userSchema.js";
import generateToken from "../utils/generateToken.js";

// auth Register
export const authRegister = asyncHandler(async (req, res) => {
    console.log("req: ", req.body); 

    const { name, email, password, role, addresses } = req.body; 


    const userExists = await User.findOne({ email }); 
    if (userExists) {
        res.status(400); 
        throw new Error("User already exits, Try login")
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
        addresses: [], 
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            avater: user.avater,
            role: user.role,
            addresses: user.addresses,
        }); 
    } else {
        res.status(400); ("Invalid user data");
    }

    res.status(200).json({
        message: "Register route working "
    })
}); 

// auth login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await user.matchPassword(password);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar, // Fixed typo from "avater"
      role: user.role,
      addresses: user.addresses || [],
      token: generateToken(user._id),
    },
  });
});


// get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); 

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar, 
      role: user.role,
      addresses: user.addresses || [],
    })
  } else {
    console.error("Profile: User not found for ID", req.user?._id); 
    res.status(404); 
    throw new Error("User not found")
  }
});

// user logout

export const userLogOut = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true, 
    message: "Logged out successfully"
  })
})