import userModel from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const addfavourite = async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { $addToSet: { favourite: req.body.collectionId } },
      { new: true }
    );
    if (!user) {
      return new errorHandler("User is not found", 404);
    }

    const { password: pass, ...userInfo } = user?._doc;
    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

export const removeFromfavourite = async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { $pull: { favourite: req.body.collectionId } },
      { new: true }
    );
    if (!user) {
      return new errorHandler("User is not found", 404);
    }

    const { password, ...userInfo } = user?._doc;
    res.status(200).json({ userInfo });
  } catch (error) {
    next(error);
  }
};

export const getUserfavourite = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId).populate("favourite");
    if (!user) {
      return next(new errorHandler("user Not Found", 404));
    }

    res.status(200).json({ favourite: user.favourite });
  } catch (error) {
    next(error);
  }
};
