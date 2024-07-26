import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  getDeadline,
  createDeadline,
  getStudentActiveDeadline,
  getTeacherActiveDeadline,
} from "../controllers/deadline.js";

const router = express.Router();

router.post("/", verifyToken, createDeadline);

router.get("/", verifyToken, getDeadline);
router.get("/student", verifyToken, getStudentActiveDeadline);
router.get("/teacher", verifyToken, getTeacherActiveDeadline);

export default router;
