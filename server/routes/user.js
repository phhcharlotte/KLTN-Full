import express from "express";
import { getUsers, deleteUser, getTeachers } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/teacher", getTeachers);
router.delete("/:id", deleteUser);

export default router;
