import asyncHandler from "express-async-handler";
import User from "../models/userSchema.js";

// get all users
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password")
    res.status(200).json({
        success: true, 
        users
    })
}); 

// create users
export const createUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        role,
        addresses
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
        addresses: addresses || [],
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avater: user.avater,
            role: user.role,
            addresses: user.addresses
        });
    } else {
        res.status(400);
        throw new Error("Invalid user Data");
    }

}); 


// get user

export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password"); 

    if (user) {
        res.json(user); 
    } else {
        res.status(404); 
        throw new Error("User not found"); 
    }
}); 

// update users
// export const updateUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//         res.status(404);
//         throw new Error("User not found");
//     }

//     user.name = req.body.name || user.name;

//     if (req.body.role) {
//         user.role = role.body.role
//     }

//     user.addresses = req.body.addresses || user.addresses;

//     const updateUser = await user.save();

//     res.status(200).json({
//         _id: updateUser._id,
//         name: updateUser.name,
//         email: updateUser.name,
//         avater: updateUser.avater,
//         role: updateUser.role,
//         addresses: updateUser.addresses,
//     })

// })

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.role) {
    user.role = req.body.role;
  }

  user.addresses = req.body.addresses || user.addresses;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    avater: updatedUser.avater,
    role: updatedUser.role,
    addresses: updatedUser.addresses,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
    
})