import express from "express";
import {
  createThesis,
  getAllTheses,
  getThesisById,
  getRegisteredThesisId,
  teacherUpdate,
  updateRegistrationStatus,
  deleteThesis,
  getThesisByTeacherCode,
  deleteMember,
} from "../controllers/thesis.js";
import { verifyToken } from "../middlewares/auth.js";
import { checkTeacherDeadline, checkStudentDeadline } from "../middlewares/checkDeadline.js";

const router = express.Router();

//   http://localhost:3001/theses + các route bên dưới
// create
router.post("/", verifyToken, checkTeacherDeadline, createThesis);

// read
router.get("/", verifyToken, getAllTheses);
router.get("/getbyid/:id", verifyToken, getThesisById);
router.get("/registered", verifyToken, getRegisteredThesisId);
router.get("/getbyteachercode", verifyToken, getThesisByTeacherCode);

// update
router.put("/update/:id", verifyToken, checkTeacherDeadline, teacherUpdate);
router.put("/change/:id", verifyToken, checkStudentDeadline, updateRegistrationStatus);
// delete
router.put("/deletemember/:id", verifyToken, deleteMember);
router.delete("/:id", verifyToken, checkTeacherDeadline, deleteThesis);

export default router;
