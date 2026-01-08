import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    brand,
    image,
    discountPercentage,
    stock,
  } = req.body;

  const productExists = await Product.findOne({ name });

  if (productExists) {
    res.status(400);
    throw new Error("product with this name already exists");
  }

  let imageUrl = "";

  // if (image) {
  //     const uploadRes = await cloudinary.uploader.upload(image, {
  //         folder: "products",
  //     });
  //     imageUrl = uploadRes.secure_url;
  // }
  if (image) {
    let base64Image = image;

    if (image.startsWith("data:image")) {
      base64Image = image.split(",")[1]; // remove prefix
    }

    const uploadRes = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64Image}`,
      {
        folder: "products",
      }
    );

    imageUrl = uploadRes.secure_url;
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    brand,
    discountPercentage: discountPercentage || 0,
    stock: stock || 0,
    image: imageUrl,
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("category", "name")
    .populate("brand", "name")
    .sort({ createdAt: -1 });

  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name")
    .populate("brand", "name");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const {
    name,
    description,
    price,
    category,
    brand,
    image,
    discountPercentage,
    stock,
  } = req.body;

  if (image) {
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: "products",
    });
    product.image = uploadRes.secure_url;
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price ?? product.price;
  product.category = category || product.category;
  product.brand = brand || product.brand;
  product.discountPercentage = discountPercentage ?? product.discountPercentage;
  product.stock = stock ?? product.stock;

  const updatedProduct = await product.save();

  res.status(200).json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.json({ message: "Product removed successfully" });
});
