const express = require("express");
const {
  createProduct,
  updateProduct,
  getProducts,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.get("/", getProducts);

module.exports = router;
