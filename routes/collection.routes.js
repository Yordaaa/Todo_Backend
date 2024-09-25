import express from "express";
import {
  createCollection,
  getAllCollections,
  getCollectionById,
  addTaskToCollection,
  getTasksByCollection,
  addSubtaskToTask,
  getSubtasksByTask,
  updateTaskStatus,
  editTask // Add this import for the edit functionality
} from "../controllers/collection.controller.js";

const router = express.Router();

// Collection routes
router.post("/create-collection", createCollection); // Create a new collection
router.get("/get-all-collections", getAllCollections); // Get all collections
router.get("/get-collection/:collectionId", getCollectionById); // Get a single collection by ID

// Task routes
router.post("/add-task/:collectionId", addTaskToCollection); // Add a task to a specific collection
router.get("/get-tasks/:collectionId", getTasksByCollection); // Get tasks by collection ID
router.patch("/update-task-status/:taskId", updateTaskStatus); // Update task status
router.put("/edit-task/:taskId", editTask); // New route for editing a task using PUT

// Subtask routes
router.post("/add-subtask/:taskId", addSubtaskToTask); // Add a subtask to a specific task
router.get("/get-subtasks/:taskId", getSubtasksByTask); // Get subtasks for a specific task

export default router;