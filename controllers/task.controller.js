// task.controller.js
import { Task } from "../models/task.model.js";
import { Collection } from "../models/collection.model.js";

// Add a task or subtask
export const addTask = async (req, res, next) => {
  const { description, date, collectionId, parentId } = req.body; // Include parentId for subtasks
  try {
    const newTask = new Task({
      description,
      date,
      userId: req.userId,
    });

    // Check if it's a subtask
    if (parentId) {
      newTask.parentId = parentId; // Set parentId for the subtask

      // Find the parent task and push the new subtask ID into its subtasks array
      const parentTask = await Task.findById(parentId);
      if (!parentTask) {
        return res.status(404).json({ message: "Parent task not found" });
      }

      await parentTask.updateOne({ $push: { subtasks: newTask._id } }); // Update parent task's subtasks
    } else if (collectionId) {
      newTask.collectionId = collectionId;
      await Collection.findByIdAndUpdate(
        collectionId,
        { $push: { tasks: newTask._id } },
        { new: true }
      );
    }

    await newTask.save();
    res.status(201).json({ message: "Task added", task: newTask });
  } catch (error) {
    next(error);
  }
};

// Edit a task or subtask
export const editTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { description, status, date } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { description, status, date },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    next(error);
  }
};

// Update task or subtask status
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

    // Update all subtasks' status based on the parent task's new status
    if (updatedTask.subtasks && updatedTask.subtasks.length > 0) {
      await Task.updateMany(
        { _id: { $in: updatedTask.subtasks } }, // Use $in to update all subtasks at once
        { status }
      );
    }

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get user-specific tasks by collection ID
export const getUserTasksById = async (req, res, next) => {
  const { collectionId } = req.params;
  try {
    const tasks = await Task.find({
      collectionId,
      userId: req.userId,
    })
      .populate("collectionId")
      .populate({
        path: "subtasks",
        populate: { path: "subtasks" } // Populate nested subtasks
      });

    // Fetch the collection name
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    // Define collectionName here
    const collectionName = collection.collectionName;

    res.status(200).json({ success: true, tasks, collectionName });
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

// Get all users task
export const getUserTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).populate(
      "collectionId"
    );
    if (!tasks) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
};


// Delete a task or subtask
export const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const taskToDelete = await Task.findById(taskId);

    if (!taskToDelete) {
      return res.status(404).json({ message: "Task not found" });
    }

    // If it's a subtask, remove its reference from the parent task's subtasks array
    if (taskToDelete.parentId) {
      const parentTask = await Task.findById(taskToDelete.parentId);
      if (parentTask) {
        await parentTask.updateOne({ $pull: { subtasks: taskId } }); // Remove taskId from parent's subtasks
      }
    }

    // Delete the task (and subtasks if you want to delete them too)
    await Task.deleteOne({ _id: taskId });

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};