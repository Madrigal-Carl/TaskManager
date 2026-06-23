import { asyncHandler } from "../utils/asyncHandler.js";
import {
    getAllTasks,
    createTaskService,
    updateTaskService,
    deleteTaskService,
    markTaskService,
} from "../services/task.service.js";

export const getTasks = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 5,
        search,
        status,
        priority,
        date,
    } = req.query;

    const result = await getAllTasks({
        page: Number(page),
        limit: Number(limit),
        search,
        status,
        priority,
        date
    });

    return res.json(result);
});

export const createTask = asyncHandler(async (req, res) => {
    const task = await createTaskService(req.body);

    return res.status(201).json({
        message: "Task created successfully",
        task,
    });
});

export const updateTask = asyncHandler(async (req, res) => {
    const task = await updateTaskService(req.params.id, req.body);

    return res.json({
        message: "Task updated successfully",
        task,
    });
});

export const deleteTask = asyncHandler(async (req, res) => {
    await deleteTaskService(req.params.id);

    return res.json({
        message: "Task deleted successfully",
    });
});

export const markTask = asyncHandler(async (req, res) => {
    const task = await markTaskService(req.params.id, req.body.status);

    return res.json({
        message: `Task marked as ${task.status}`,
        task,
    });
});