import collectionModel from "../models/collection.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createCollections = async (req, res, next) => {
  const { collectionName,  collectionImg } = req.body; // Updated field name
  try {
    if (!collectionName) {
      return next(new errorHandler("Missing required fields.", 400));
    }

    if (await collectionModel.findOne({ collectionName })) {
      return next(new errorHandler("Collection already exists.", 409));
    }

    const createCollection = new collectionModel({
      collectionName,
      collectionImg,
    });

    await createCollection.save();

    res
      .status(201)
      .json({ message: "Collection added successfully.", createCollection });
  } catch (error) {
    next(error);
  }
};

export const getAllCollections = async (req, res, next) => {
  try {
    const collections = await collectionModel
      .find()
      .select("-__v");

    res.status(200).json(collections);
  } catch (error) {
    next(error);
  }
};
