import {  Task } from "../models/task.model.js";


// Add a task to a collection
export const addTaskToCollection = async (req, res, next) => {
    const { description, status, date } = req.body;
    const { collectionId } = req.params;
    console.log(req.userId);
    try {
      const newTask = new Task({ description, status, date, userId: req.userId });
      await newTask.save();
  
      // Add the task to the specified collection
      const collection = await Collection.findById(collectionId);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
  
      collection.tasks.push(newTask._id);
      await collection.save();
  
      res
        .status(201)
        .json({ message: "Task added to collection", task: newTask });
    } catch (error) {
      next(error);
    }
  };
  
  export const getTasksByCollection = async (req, res, next) => {
    const { collectionId } = req.params;
  
    try {
      const collection = await Collection.findById(collectionId);
  
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
  
      res.status(200).json({ success: true, tasks: collection.tasks });
    } catch (error) {
      next(error); // Handle any potential errors
    }
  };
  // Add a subtask to a task
  export const addSubtaskToTask = async (req, res, next) => {
    const { description, status, date } = req.body;
    const { taskId } = req.params;
  
    try {
      const parentTask = await Task.findById(taskId);
      if (!parentTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      const newSubtask = new Task({ description, status, date });
      await newSubtask.save();
  
      parentTask.subtasks.push(newSubtask._id);
      await parentTask.save();
  
      res.status(201).json({ message: "Subtask added", subtask: newSubtask });
    } catch (error) {
      next(error);
    }
  };
  
  // Get subtasks by task ID
  export const getSubtasksByTask = async (req, res, next) => {
    const { taskId } = req.params;
  
    try {
      const task = await Task.findById(taskId).populate("subtasks");
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ success: true, subtasks: task.subtasks });
    } catch (error) {
      next(error);
    }
  };
  
  export const editTask = async (req, res, next) => {
    const { taskId } = req.params;
    const { description, status, date } = req.body; // Get updated values from request body
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { description, status, date }, // Update fields based on input
        { new: true, runValidators: true } // Return the updated document and run validators
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ success: true, task: updatedTask });
    } catch (error) {
      next(error);
    }
  };
  
  export const updateTaskStatus = async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { status },
        { new: true }
      );
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({ success: true, task: updatedTask });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };