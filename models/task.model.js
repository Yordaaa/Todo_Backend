import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    date: { type: Date, required: true },
    subtasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    collectionId: [{ type: Schema.Types.ObjectId, ref: "Collections" }], 
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Task = model("Task", taskSchema);