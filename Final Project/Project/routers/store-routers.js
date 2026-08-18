const express = require("express");

const storeControllers = require("../controllers/store-controllers");
const upload = require("../middlewares/upload");
const authenticateMiddleware = require("../middlewares/authenticate-middleware");
const authorizeMiddleware = require("../middlewares/authorize-middleware");

const router = express.Router();


router
    .route("/")
    .get(storeControllers.getAllStores)
    .post(authenticateMiddleware, authorizeMiddleware("seller"), upload.single("image"), storeControllers.createStore);


router
    .route("/:id")
    .get(storeControllers.getStoreById)
    .patch(authenticateMiddleware, authorizeMiddleware("seller"), upload.single("image"), storeControllers.updateStore)
    .delete(authenticateMiddleware, authorizeMiddleware("seller"), storeControllers.deleteStore);


module.exports = router;