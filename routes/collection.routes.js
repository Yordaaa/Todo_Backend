import express from "express";
import {
  createCollection,
  getAllCollections,
  getCollectionById,
} from "../controllers/collection.controller.js";

const router = express.Router();

// Collection routes
router.post("/create-collection", createCollection); // Create a new collection
router.get("/get-all-collections", getAllCollections); // Get all collections
router.get("/get-collection/:collectionId", getCollectionById); // Get a single collection by ID

export default router;