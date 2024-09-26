import { Collection } from "../models/collection.model.js";

// Create a new collection
export const createCollection = async (req, res, next) => {
  const { collectionName, collectionImg } = req.body;
  try {
    const newCollection = new Collection({ collectionName, collectionImg });
    await newCollection.save();
    res.status(201).json({ success: true, collection: newCollection });
  } catch (error) {
    next(error);
  }
};

// Get all collections
export const getAllCollections = async (req, res, next) => {
  try {
    const collections = await Collection.find();
    res.status(200).json({ success: true, collections });
  } catch (error) {
    next(error);
  }
};
