const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Store name is required"],
        unique: true,
        trim: true,
        minlength: [3, "Store name must be at least 3 characters long"],
        maxlength: [100, "Store name must be at most 100 characters long"],
    },
    description: {
        type: String,
        lowercase: true,
        required: [true, "Store description is required"],
        trim: true,
        maxlength: [500, "Description must be at most 500 characters long"],
    },
    category: {
        type: String,
        required: [true, "Store category is required"],
        trim: true,
        lowercase: true,
        enum: {
            values: [
                "crochet",
                "wood",
                "candles",
                "jewelry",
                "other"
            ],
        },
    },
    logo: {
        type: String,
        default: "default-store.png",
    },
}, {
    timestamps: true,
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;