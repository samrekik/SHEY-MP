const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { productController } = require("../controllers/productController");
const route = express.Router();

route.post("/add-product", authMiddleware, productController.AddProd);
route.get("/get-product", authMiddleware, productController.getAllProd);
route.put("/edit-product/:id", authMiddleware, productController.editProduct);
route.delete("/delete-product/:id", authMiddleware, productController.deleteProduct);
module.exports.productRoute = route;
