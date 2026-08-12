const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [3, "Product name must be at least 3 characters long"],
        maxlength: [100, "Product name must be at most 100 characters long"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
        maxlength: [500, "Description must be at most 500 characters long"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price cannot be negative"],
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
        min: [0, "Quantity cannot be negative"],
        default: 0,
    },
    image: {
        type: String,
        default: "default-product.png",
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: [true, "Product must belong to a store"],
    },
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;