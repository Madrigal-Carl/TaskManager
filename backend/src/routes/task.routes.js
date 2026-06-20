import express from "express";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    markTaskComplete,
    markTaskIncomplete,
} from "../controllers/task.controller.js";
import { validateTask, validateTaskStatus } from "../validators/task.validator.js";

const router = express.Router();

router.get("/", getTasks);

router.post("/", validateTask, createTask);

router.put("/:id", validateTask, updateTask);

router.delete("/:id", deleteTask);

router.patch("/:id/complete", validateTaskStatus, markTaskComplete);

router.patch("/:id/incomplete", validateTaskStatus, markTaskIncomplete);

export default router;