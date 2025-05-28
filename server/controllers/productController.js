const multer = require("multer");
const Product = require("../models/productModel");

module.exports.productController = {
  AddProd: async (req, res) => {
    try {
      const prod = await Product.create(req.body);
      return res.status(201).json({
        success: true,
        message: "product registered successfully",
        prod,
      });
    } catch (error) {
      res.status(401).json({ success: false, error: error.message });
    }
  },
  getAllProd: async (req, res) => {
    try {
      const { seller, categories = [], age = [] } = req.body;
      let filters = {};
      if (seller) {
        filters.seller = seller;
      }
      const prod = await Product.find(filters)
        .populate("seller")
        .sort({ createdAt: -1 });
      return res.status(201).json({
        success: true,

        data: prod,
      });
    } catch (error) {
      res.status(401).json({ success: false, error: error.message });
    }
  },
  editProduct: async (req, res) => {
    try {
      await Product.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        message: "product updatetd successfuly",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  updateStatusProduct: async (req, res) => {
    try {
      const { status } = req.body;
      await Product.findByIdAndUpdate(req.params.id, { status });
      return res.status(200).json({
        success: true,
        message: "product status updatetd successfuly",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: "product deleted successfuly",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
