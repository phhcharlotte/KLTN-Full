import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getNotification, updateNotificationStatus, deleteAllNotification } from "../controllers/notification.js";

const router = express.Router();

router.get("/", verifyToken, getNotification);
router.put("/:id", verifyToken, updateNotificationStatus);

router.delete("/delete", verifyToken, deleteAllNotification);
export default router;
