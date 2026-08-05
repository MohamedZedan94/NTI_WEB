const Store = require("../models/store-model");

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
        const newStore = await Store.create(req.body);
        res.status(201).json({
            status: "success",
            message: "Store created successfully",
            data: {
                store: newStore,
            },
        });
    } catch (error) {
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
        const updatedStore = await Store.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
            runValidators: true,
        });
        if (!updatedStore) {
            return res.status(404).json({
                status: "error",
                message: "Store not found",
            });
        }
        res.status(200).json({
            status: "success",
            message: "Store updated",
            data: { store: updatedStore },
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Error updating store: " + error.message,
        });
    }
};

const deleteStore = async (req, res) => {
    try {
        const deletedStore = await Store.findByIdAndDelete(req.params.id);
        if (!deletedStore) {
            return res.status(404).json({
                status: "error",
                message: "Store not found",
            });
        }
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