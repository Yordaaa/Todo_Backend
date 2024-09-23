import express from "express";
import {
  getAllCollections,
//   getProductByCollection,
  createCollections,
} from "../controllers/collection.controller.js";

const router = express.Router();

router.post("/create-collection", createCollections);
router.get("/get-all-collections", getAllCollections);
// router.get("/getCollection-product", getProductByCollection);

export default router;
