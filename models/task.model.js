import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    date: { type: Date, required: true },
    subtasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    collectionId: { type: Schema.Types.ObjectId, ref: "Collection" },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export const Task = model("Task", taskSchema);
