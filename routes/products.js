const express = require("express");
const router = express.Router();
const Product = require("../models/ProductSchema");
const multer = require("multer");


// إعداد التخزين للصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./images"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.fieldname),
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Create Product
router.post("/CreateProduct", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, description, price, stock, isFeatured, category, discountPercent, isOnSale, brand} = req.body;

    if (!title || !description || !price || !stock || !brand) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      stock,
      isFeatured: true,
      isOnSale: true,
      discountPercent,
      category,
      coverImage: req.file ? req.file.filename : req.body.coverImage || null,
      brand,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", Product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
router.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put("/updateProduct/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("category", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated successfully", Product: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
