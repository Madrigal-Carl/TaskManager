import { z } from "zod";

const taskSchema = z.object({
    title: z
        .string({
            required_error: "Task title is required",
        })
        .trim()
        .min(1, "Task title is required")
        .max(200, "Task title must not exceed 200 characters"),
    description: z
        .string()
        .trim()
        .max(1000, "Description must not exceed 1000 characters")
        .optional()
        .default(""),
    priority: z.enum(["low", "medium", "high"], {
        required_error: "Priority is required",
        message: "Priority must be low, medium, or high",
    }),
    dueDate: z
        .string()
        .datetime({ message: "Invalid date format" })
        .optional()
        .nullable(),
});

export const validateTask = (req, res, next) => {
    const result = taskSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: result.error.issues,
        });
    }

    req.body = result.data;
    next();
};