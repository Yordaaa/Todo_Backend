import { Collection} from "../models/collection.model.js";

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
    const collections = await Collection.find().populate("tasks");
    res.status(200).json({ success: true, collections });
  } catch (error) {
    next(error);
  }
};

// Get collection by ID
export const getCollectionById = async (req, res, next) => {
  const { collectionId } = req.params;

  try {
    const collection = await Collection.findById(collectionId).populate({
      path: "tasks",
      populate: {
        path: "subtasks",
        populate: {
          path: "subtasks", // Recursively populate subtasks of subtasks
          populate: { path: "subtasks" }, // If more levels are needed, you can continue nesting this way
        },
      },
    });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json({ success: true, collection });
  } catch (error) {
    next(error);
  }
};


