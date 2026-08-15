const express = require("express");
const storeControllers = require("../controllers/store-controllers");
const upload = require("../middlewares/upload");
const router = express.Router();

router
    .route("/")
    .get(storeControllers.getAllStores)
    .post(upload.single("image"), storeControllers.createStore);

router
    .route("/:id")
    .get(storeControllers.getStoreById)
    .patch(upload.single("image"), storeControllers.updateStore)
    .delete(storeControllers.deleteStore);

module.exports = router;