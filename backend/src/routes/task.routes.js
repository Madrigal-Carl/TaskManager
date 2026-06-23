import express from "express";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    markTask,
} from "../controllers/task.controller.js";
import { validateTask, validateTaskStatus } from "../validators/task.validator.js";

const router = express.Router();

router.get("/", getTasks);

router.post("/", validateTask, createTask);

router.put("/:id", validateTask, updateTask);

router.delete("/:id", deleteTask);

router.patch("/:id/status", validateTaskStatus, markTask);

export default router;