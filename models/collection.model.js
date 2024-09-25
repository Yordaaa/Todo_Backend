import { Schema, model } from "mongoose";

// Task Schema (Recursive subtasks)
const taskSchema = new Schema(
  {
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    date: { type: Date, required: true },
    subtasks: [{ type: Schema.Types.ObjectId, ref: "Task" }], 
  },
  { timestamps: true }
);

// Collection Schema
const collectionSchema = new Schema(
  {
    collectionName: { type: String, required: true, unique: true },
    collectionImg: { type: String },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

// Models
export const Task = model("Task", taskSchema);
export const Collection = model("Collection", collectionSchema);
