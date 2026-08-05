const express = require("express");
const storeControllers = require("../controllers/store-controllers");
const router = express.Router();

router
    .route("/")
    .get(storeControllers.getAllStores)
    .post(storeControllers.createStore);

router
    .route("/:id")
    .get(storeControllers.getStoreById)
    .patch(storeControllers.updateStore)
    .delete(storeControllers.deleteStore);

module.exports = router;