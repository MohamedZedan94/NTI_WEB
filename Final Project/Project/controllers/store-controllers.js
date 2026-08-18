const Store = require("../models/store-model");
const Product = require("../models/product-model");
const deleteUploadedFile = require("../utils/delete-uploaded-file");


const getAllStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.status(200).json({
            status: "success",
            count: stores.length,
            data: {
                stores,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching stores",
        });
    }
};

const createStore = async (req, res) => {
    try {
        const newStore = new Store({ ...req.body, owner: req.userId });
        if (req.file) {
            newStore.image = req.file.filename;
        }
        const savedStore = await newStore.save();
        res.status(201).json({
            status: "success",
            message: "Store created successfully",
            data: {
                store: savedStore,
            },
        });
    } catch (error) {
        if (req.file) {
            await deleteUploadedFile("stores", req.file.filename);
        }
        res.status(400).json({
            status: "error",
            message: "Error creating store: " + error.message,
        });
    }
};

const getStoreById = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) {
            return res.status(404).json({
                status: "error",
                message: "Store not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: { store },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching store",
        });
    }
};

const updateStore = async (req, res) => {
    try {
        const existingStore = await Store.findById(req.params.id);
        if (!existingStore) {
            if (req.file) {
                await deleteUploadedFile("stores", req.file.filename);
            }
            return res.status(404).json({
                status: "error",
                message: "Store not found",
            });
        }

        // Only the store's owner is allowed to update it
        if (existingStore.owner.toString() !== req.userId) {
            if (req.file) {
                await deleteUploadedFile("stores", req.file.filename);
            }
            return res.status(403).json({
                status: "error",
                message: "You are not allowed to update this store",
            });
        }

        const oldImage = existingStore.image;
        const updateData = { ...req.body };
        delete updateData.owner; // owner can never be changed via update

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedStore = await Store.findByIdAndUpdate(req.params.id, updateData, {
            returnDocument: "after",
            runValidators: true,
        });

        if (req.file && oldImage && oldImage !== "default-store.png") {
            await deleteUploadedFile("stores", oldImage);
        }

        res.status(200).json({
            status: "success",
            message: "Store updated",
            data: { store: updatedStore },
        });
    } catch (error) {
        if (req.file) {
            await deleteUploadedFile("stores", req.file.filename);
        }
        res.status(400).json({
            status: "error",
            message: "Error updating store: " + error.message,
        });
    }
};

const deleteStore = async (req, res) => {
    try {
        const existingStore = await Store.findById(req.params.id);
        if (!existingStore) {
            return res.status(404).json({
                status: "error",
                message: "Store not found",
            });
        }

        // Only the store's owner is allowed to delete it
        if (existingStore.owner.toString() !== req.userId) {
            return res.status(403).json({
                status: "error",
                message: "You are not allowed to delete this store",
            });
        }

        const deletedStore = await Store.findByIdAndDelete(req.params.id);

        if (deletedStore.image && deletedStore.image !== "default-store.png") {
            await deleteUploadedFile("stores", deletedStore.image);
        }

        // Cascade delete: remove every product that belonged to this store,
        // along with each product's uploaded image
        const productsToDelete = await Product.find({ store: deletedStore._id });
        for (const product of productsToDelete) {
            if (product.image && product.image !== "default-product.png") {
                await deleteUploadedFile("products", product.image);
            }
        }
        await Product.deleteMany({ store: deletedStore._id });

        res.status(200).json({
            status: "success",
            message: "Store deleted",
            data: { store: deletedStore },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error deleting store: " + error.message,
        });
    }
};

module.exports = {
    getAllStores,
    createStore,
    getStoreById,
    updateStore,
    deleteStore,
};