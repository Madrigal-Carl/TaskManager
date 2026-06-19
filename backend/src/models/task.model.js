import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        status: {
            type: String,
            enum: ["pending", "incomplete", "complete"],
            default: "pending",
        },
        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Task", taskSchema);