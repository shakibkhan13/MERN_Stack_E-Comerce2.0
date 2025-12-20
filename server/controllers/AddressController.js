import asyncHandler from "express-async-handler";
import User from "../models/userSchema.js";


export const addAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        res.status(403);
        throw new Error("Not authorized to modify this user's address");
    }

    const {
        street,
        city,
        country,
        postalCode,
        isDefault,
    } = req.body;

    if (!street || !city || !country || !postalCode) {
        res.status(400);
        throw new Error("All address fields are required");
    }

    if (isDefault) {
        user.addresses.forEach((addr) => {
            addr.isDefault = false;
        });
    }

    if (user.addresses.length === 0) {
        user.addresses.push({
            street,
            city,
            country,
            postalCode,
            isDefault: true,
        });
    } else {
        user.addresses.push({
            street,
            city,
            country,
            postalCode,
            isDefault: isDefault || false,
        });
    }

    await user.save();

    res.json({
        success: true,
        addresses: user.addresses,
        message: "Address added successfully. "
    });
}); 


export const updateAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }


  if (
    user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    res.status(403);
    throw new Error("Not authorized to modify this user's addresses");
  }
s
  const address = user.addresses.id(req.params.addressId);

  if (!address) {
    res.status(404);
    throw new Error("Address not found");
  }

  const { street, city, country, postalCode, isDefault } = req.body;

  if (street !== undefined) address.street = street;
  if (city !== undefined) address.city = city;
  if (country !== undefined) address.country = country;
  if (postalCode !== undefined) address.postalCode = postalCode;

  if (isDefault === true) {
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });
    address.isDefault = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address updated successfully",
    addresses: user.addresses,
  });
});


export const deleteAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id); 

    if (!user) {
        res.status(404); 
        throw new Error("User not found"); 
    }

    if (user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        res.status(403); 
        throw new Error("Not authorized to modify this user's addresses"); 
    }

    const address = user.addresses.id(req.params.addressId); 

    if (!address) {
        res.status(404); 
        throw new Error("Address not found"); 
    }

    const wasDefault = address.isDefault; 
    user.addresses.pull(req.params.addressId); 

    if (wasDefault && user.addresses.length > 0) {
        user.addresses[0].isDefault = true; 
    }

    await user.save(); 

    res.json({
        success: true,
        addresses: user.addresses,
        message: "Address deleted successfully."
    }); 
}); 

