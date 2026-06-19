import Task from "../models/task.model.js";

export const getAllTasks = async ({ page, limit, search, status, priority }) => {
    const filter = {};

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }

    if (status) {
        filter.status = status;
    }

    if (priority) {
        filter.priority = priority;
    }

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
        Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Task.countDocuments(filter),
    ]);

    return {
        tasks,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    };
};

export const createTaskService = async (data) => {
    return await Task.create(data);
};

export const updateTaskService = async (id, data) => {
    const task = await Task.findByIdAndUpdate(
        id,
        { ...data },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!task) {
        throw new Error("Task not found");
    }

    return task;
};

export const deleteTaskService = async (id) => {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        throw new Error("Task not found");
    }

    return task;
};