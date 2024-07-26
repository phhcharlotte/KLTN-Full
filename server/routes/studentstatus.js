import express from "express";
import { verifyToken } from "../middlewares/auth.js";

import {
  getStudentStatus,
  updateCouncil,
  deleteStudentStatus,
  getStudentStatusByCouncilName,
  updateDocument,
} from "../controllers/status.js";
const router = express.Router();

router.get("/", getStudentStatus);
router.get("/getlist", verifyToken, getStudentStatusByCouncilName);

router.put("/update", updateCouncil);
router.put("/updatedocument", verifyToken, updateDocument);

router.delete("/delete", deleteStudentStatus);
export default router;
