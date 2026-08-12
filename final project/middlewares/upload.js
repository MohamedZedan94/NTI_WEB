const multer = require("multer");
const fs = require("fs");


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dest = "uploads";

        if (req.baseUrl.includes("stores")) {
            dest = "uploads/stores";
        } else if (req.baseUrl.includes("products")) {
            dest = "uploads/products";
        }

        try {
            fs.mkdirSync(dest, { recursive: true });
            cb(null, dest);
        } catch (err) {
            cb(err, null);
        }
    },

    filename: function (req, file, cb) {
        let fileType = file.mimetype.split("/")[1];
        let filename = file.originalname;

        if (req.baseUrl.includes("stores")) {
            filename = `store-${Date.now()}.${fileType}`;
        } else if (req.baseUrl.includes("products")) {
            filename = `product-${Date.now()}.${fileType}`;
        }
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    let filetype = file.mimetype.split("/")[0];
    if (filetype === "image") {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};


const upload = multer({ storage: diskStorage, fileFilter: fileFilter });


module.exports = upload;