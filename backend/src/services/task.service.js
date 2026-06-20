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

    const [tasks, total, totalCount, pendingCount, completeCount, incompleteCount] = await Promise.all([
        Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Task.countDocuments(filter),
        Task.countDocuments({}),
        Task.countDocuments({ status: "pending" }),
        Task.countDocuments({ status: "complete" }),
        Task.countDocuments({ status: "incomplete" }),
    ]);

    return {
        tasks,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
        statusCounts: {
            total: totalCount,
            pending: pendingCount,
            complete: completeCount,
            incomplete: incompleteCount,
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

export const markTaskCompleteService = async (id) => {
    const task = await Task.findById(id);

    if (!task) {
        throw new Error("Task not found");
    }

    if (task.status !== "pending") {
        throw new Error("Only pending tasks can be marked as complete");
    }

    task.status = "complete";
    await task.save();

    return task;
};

export const markTaskIncompleteService = async (id) => {
    const task = await Task.findById(id);

    if (!task) {
        throw new Error("Task not found");
    }

    if (task.status !== "pending") {
        throw new Error("Only pending tasks can be marked as incomplete");
    }

    task.status = "incomplete";
    await task.save();

    return task;
};