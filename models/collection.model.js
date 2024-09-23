import { Schema, model } from "mongoose";

const collectionSchema = new Schema(
  {
    collectionName: { type: String, required: true, unique: true },
    collectionImg: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("Collection", collectionSchema);
