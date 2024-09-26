import express from "express";
import {
  createCollection,
  getAllCollections,
} from "../controllers/collection.controller.js";

const router = express.Router();

// Collection routes
router.post("/create-collection", createCollection);
router.get("/get-all-collections", getAllCollections);

export default router;
