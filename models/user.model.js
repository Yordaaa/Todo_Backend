import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    favourite: [
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("user", userSchema);
