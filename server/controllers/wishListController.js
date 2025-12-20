import asyncHandler from "express-async-handler";
import User from "../models/userSchema.js";
import Product from "../models/productModel.js";



export const getUserWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("wishlist"); 

    if (!user) {
        res.status(404); 
        throw new Error("User not found"); 
    }

    res.json({
        success: true,
        wishlist: user.wishlist || [],
    }); 
}); 

export const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body; 

    if (!productId) {
        res.status(400); 
        throw new Error("Product Id is required"); 
    }

    const product = await Product.findById(productId); 
    if (!product) {
        res.status(404); 
        throw new Error("Product not found"); 
    }

    const user = await User.findById(req.user._id); 

    if (!user) {
        res.status(404); 
        throw new Error("User not found"); 
    }

    if (user.wishlist.includes(productId)) {
        res.status(400); 
        throw new Error("Product already in wishlist"); 
    }

    user.wishlist.push(productId); 
    await user.save(); 

    res.json({
        success: true,
        wishlist: user.wishlist,
        message: "Product added to wishlist",
    }); 
});



export const getWishlistProducts = asyncHandler(async (req, res) => {
    const { productIds } = req.body; 

    if (!productIds || !Array.isArray(productIds)) {
        res.status(400); 
        throw new Error("Product Ids array is required"); 
    }

    const products = await Product.find({
        _id: { $in: productIds },
    }).populate("category", "name"); 

    res.json({
        success: true,
        products,
    }); 
}); 



export const deleteWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body; 

    if (!productId) {
        res.status(400); 
        throw new Error("Product Id is required"); 
    }

    const user = await User.findById(req.user._id); 

    if (!user) {
        res.status(404); 
        throw new Error("User not found"); 
    }

    user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId.toString(),
    );
    
    await user.save(); 

    res.json({
        success: true,
        wishlist: user.wishlist,
        message: "Product removed from wishlist",
    }); 
}); 


export const clearWishList = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    user.wishlist = [];
    await user.save();

    res.json({
        success: true,
        wishlist: [],
        message: "Wishlist cleared successfully",
    });
}); 
