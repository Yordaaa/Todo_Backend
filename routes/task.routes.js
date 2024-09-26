import express from "express";
import {
  addTask,
  getTasksByCollection,
  addSubtaskToTask,
  getSubtasksByTask,
  updateTaskStatus,
  editTask,
  getUserTasksById,
  getUserTask,
} from "../controllers/task.controller.js";

const router = express.Router();

// Task routes
router.post("/add-task/:collectionId", addTask); // Add a task to a specific collection
router.get("/get-tasks/:collectionId", getTasksByCollection); // Get tasks by collection ID
router.patch("/update-task-status/:taskId", updateTaskStatus); // Update task status
router.put("/edit-task/:taskId", editTask); // New route for editing a task using PUT
router.post("/add-subtask/:taskId", addSubtaskToTask); // Add a subtask to a specific task
router.get("/get-subtasks/:taskId", getSubtasksByTask); // Get subtasks for a specific task
router.get("/get-collection-tasks/:collectionId", getUserTasksById);
router.get("/get-user-task", getUserTask);

export default router;
