import express from "express";
import authRoutes from "./auth.routes.js";
import globalErrorHandler from "../middlewares/globalErrorHandler.js";
import collectionRoutes from "./collection.routes.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/collection", collectionRoutes);
router.use(globalErrorHandler);

export default router;
