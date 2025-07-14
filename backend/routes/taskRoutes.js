import express from "express";
import {
  createTask,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/autherization.js";


const router = express.Router();

// Public / protected based on your auth setup
router.post("/",    createTask);
router.get("/", getAllTask);
router.get("/:id", getTaskById);
router.put("/:id",   updateTask);
router.delete("/:id",    deleteTask);

export default router;