import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from './user.routes.js';
import globalErrorHandler from "../middlewares/globalErrorHandler.js";
import collectionRoutes from "./collection.routes.js";


const router = express.Router();
// Define routes
router.use("/auth", authRoutes);
router.use("/collection", collectionRoutes);
router.use('/user', userRoutes);
router.use(globalErrorHandler); // Global error handler

export default router;