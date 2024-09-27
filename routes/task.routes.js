import express from 'express';
import {
  addTask,
  editTask,
  updateTaskStatus,
  getUserTasksById,
  getSubtasksByTask,
  getUserTask,
  deleteTask 
} from '../controllers/task.controller.js';

const router = express.Router();

// Task routes
router.post("/add-tasks", addTask);
router.put("/edit-tasks/:taskId", editTask);
router.patch("/update-task-status/:taskId", updateTaskStatus);
router.get("/get-user-tasks/:collectionId", getUserTasksById);
router.get("/get-tasks/:taskId", getSubtasksByTask);
router.get("/get-user-tasks", getUserTask);
router.delete("/delete-task/:taskId", deleteTask);

export default router;
