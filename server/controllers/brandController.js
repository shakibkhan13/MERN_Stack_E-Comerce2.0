import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js"; 
import cloudinary from "../config/cloudinary.js"; 


export const getBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find({}); 

    res.json(brands); 
}); 

export const getBrandId = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id); 

    if (brand) {
        res.json(brand); 
    } else {
        res.status(404); 
        throw new Error("Brand not found"); 
    }
})


export const createBrand = asyncHandler(async (req, res) => {
    const {
        name,
        image,
    } = req.body;

    const brandExists = await Brand.findOne({ name });

    if (brandExists) {
        res.status(400);
        throw new Error("Brand already exists");
    }
    
    let imageUrl = "";
    if (image) {
        const result = await cloudinary.uploader.upload(image, {
            folder: "admin-dashboard/brands",
        });
        imageUrl = result.secure_url;
    };

    const brand = await Brand.create({
        name,
        image: imageUrl || undefined,
    });

    if (brand) {
        res.status(201).json(brand);
    } else {
        res.status(400);
        throw new Error("Invalid brand data");
    }
}); 


export const updateBrand = asyncHandler(async (req, res) => {
    const {
        name,
        image,
    } = req.body;
    
    const brand = await Brand.findById(req.params.id);

    if (brand) {
        brand.name = name || brand.name;

        if (image !== undefined) {
            if (image) {
                const result = await cloudinary.uploader.upload(image, {
                    folder: "admin-dashboard/brands",
                });
                brand.image = result.secure_url;
            } else {
                brand.image = undefined;
            }
        }
        const updateBrand = await brand.save();
        res.json(updateBrand);
    } else {
        res.status(404);
        throw new Error("Brand not found");
    }
}); 


export const deleteBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);

    if (brand) {
        await brand.deleteOne();
        res.json({
            message: "Brand removed"
        });
    } else {
        res.status(404);
        throw new Error("Brand not found");
    }
}); 
