const Product = require("../models/product-model");
const Store = require("../models/store-model");
const deleteUploadedFile = require("../utils/delete-uploaded-file");


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: "success",
            count: products.length,
            data: {
                products,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching products",
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const storeExists = await Store.findById(req.body.store);
        if (!storeExists) {
            if (req.file) {
                await deleteUploadedFile("products", req.file.filename);
            }
            return res.status(404).json({
                status: "error",
                message: "Store not found",
            });
        }

        const newProduct = new Product(req.body);
        if (req.file) {
            newProduct.image = req.file.filename;
        }
        const savedProduct = await newProduct.save();

        res.status(201).json({
            status: "success",
            message: "Product created successfully",
            data: {
                product: savedProduct,
            },
        });
    } catch (error) {
        if (req.file) {
            await deleteUploadedFile("products", req.file.filename);
        }
        res.status(400).json({
            status: "error",
            message: "Error creating product: " + error.message,
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: { product },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching product",
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        if (req.body.store) {
            const storeExists = await Store.findById(req.body.store);
            if (!storeExists) {
                if (req.file) {
                    await deleteUploadedFile("products", req.file.filename);
                }
                return res.status(404).json({
                    status: "error",
                    message: "Store not found",
                });
            }
        }

        const existingProduct = await Product.findById(req.params.id);
        if (!existingProduct) {
            if (req.file) {
                await deleteUploadedFile("products", req.file.filename);
            }
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });
        }

        const oldImage = existingProduct.image;
        const updateData = { ...req.body };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, {
            returnDocument: "after",
            runValidators: true,
        });

     
        if (req.file && oldImage && oldImage !== "default-product.png") {
            await deleteUploadedFile("products", oldImage);
        }

        res.status(200).json({
            status: "success",
            message: "Product updated",
            data: { product: updatedProduct },
        });
    } catch (error) {
        if (req.file) {
            await deleteUploadedFile("products", req.file.filename);
        }
        res.status(400).json({
            status: "error",
            message: "Error updating product: " + error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });
        }
        if (deletedProduct.image && deletedProduct.image !== "default-product.png") {
            await deleteUploadedFile("products", deletedProduct.image);
        }
        res.status(200).json({
            status: "success",
            message: "Product deleted",
            data: { product: deletedProduct },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error deleting product: " + error.message,
        });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};