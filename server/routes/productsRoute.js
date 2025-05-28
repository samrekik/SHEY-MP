const express = require("express");
const  cloudinary = require("../config/cloudinaryConfig");
const authMiddleware = require("../middlewares/authMiddleware");
const { productController } = require("../controllers/productController");
const multer = require("multer");
const Product = require("../models/productModel");
const route = express.Router();

route.post("/add-product", authMiddleware, productController.AddProd);
route.post("/get-product", authMiddleware, productController.getAllProd);
route.put("/edit-product/:id", authMiddleware, productController.editProduct);
route.put("/edit-product-status/:id", authMiddleware, productController.updateStatusProduct);
route.delete(
  "/delete-product/:id",
  authMiddleware,
  productController.deleteProduct
);
//get image from pc
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
route.post(
  "/upload-image-to-product",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
        //upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path,{folder:"sheymp"});
      const  productId=req.body.productId
      await Product.findByIdAndUpdate(productId,{$push:{images:result.secure_url}})
      return res.send({
        success: true,
        message: "image uploaded successfuly",
        data:result.secure_url,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
module.exports.productRoute = route;
