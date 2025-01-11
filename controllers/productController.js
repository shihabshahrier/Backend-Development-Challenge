const Product = require("../models/product");
const Category = require("../models/category");
const generateProductCode = require("../utils/generateProductCode");

exports.createProduct = async (req, res) => {
  const { name, description, price, discount, image, status, categoryId } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).json({ message: "Invalid category" });

    const productCode = generateProductCode(name);

    const newProduct = new Product({
      name,
      description,
      price,
      discount,
      image,
      status,
      productCode,
      category: categoryId,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updates, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  const { categoryId, search, priceMin, priceMax } = req.query;

  const filters = {};
  if (categoryId) filters.category = categoryId;
  if (search) filters.name = { $regex: search, $options: "i" };
  if (priceMin || priceMax) {
    filters.price = {};
    if (priceMin) filters.price.$gte = parseFloat(priceMin);
    if (priceMax) filters.price.$lte = parseFloat(priceMax);
  }

  try {
    const products = await Product.find(filters).populate("category");
    const result = products.map((product) => ({
      ...product._doc,
      finalPrice: product.price - (product.price * product.discount) / 100,
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
