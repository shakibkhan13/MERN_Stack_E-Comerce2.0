import asyncHandler from "express-async-handler";
import cloudinary from '../config/cloudinary.js'; 
import Banner from "../models/bannerModel.js";

export const getBanners = asyncHandler(async (req, res) => {
    const banners = await Banner.find({}); 
    res.json(banners); 
    
}); 

export const getBannerById = asyncHandler(async (req, res) => {
    const banner = await Banner.findById(req.params.id); 

    if (banner) {
        res.json(banner); 
    } else {
        res.status(404); 
        throw new Error("Banner not found"); 
    }
}); 


export const createBanners = asyncHandler(async (req, res) => {
    const {
        name, 
        title, 
        startFrom, 
        image, 
        bannerType, 
    } = req.body; 

    let imageURL = ""; 
    if (image) {
        const result = await cloudinary.uploader.upload(image, {
            folder: "admin-dashboard/banners",
        }); 
        imageURL = result.secure_url; 
    }

    const banner = new Banner({
        name,
        title,
        startFrom,
        image: imageURL || undefined,
        bannerType,
    }); 

    const createdBanner = await banner.save(); 

    if (createdBanner) {
        res.status(201).json(createdBanner); 
    } else {
        res.status(400); 
        throw new Error("Invalid banner data"); 
    }
});; 


export const updateBanner = asyncHandler(async (req, res) => {
    const {
        name, 
        title, 
        startFrom, 
        image, bannerType
    } = res.body; 

    const banner = await Banner.findById(req.params.id); 

    if (banner) {
        banner.name = name || banner.name; 
        banner.title = title || banner.title; 
        banner.startFrom = startFrom || banner.startFrom; 
        banner.bannerType = bannerType || banner.bannerType; 

        try {
          if (image !== undefined) {
            if (image) {
              const result = await cloudinary.uploader.upload(image, {
                folder: "admin-dashboard/banners",
              });
              banner.image = result.secure_url;
            } else {
              banner.image = undefined;
            }
          }
          const updatedBanner = await banner.save();
          res.json(updatedBanner);
        } catch (error) {
          if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(
              (err) => err.message
            );
            res.status(400);
            throw new Error(errors.join(", "));
          }
          res.status(400); 
          throw new Error("Invalid banner data");
        }

    } else {
        res.status(404); 
        throw new Error("Banner not found"); 
    }

}); 


export const deleteBanner = asyncHandler(async (req, res) => {
    const banner = await Banner.findById(req.params.id); 

    if (banner) {
        await banner.deleteOne(); 
        res.json({
            message: "Banner removed"
        }); 
    } else {
        res.status(404); 
        throw new Error("Banner not found"); 
    }
}); 