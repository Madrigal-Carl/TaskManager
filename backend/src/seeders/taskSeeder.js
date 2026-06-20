import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import Task from "../models/task.model.js";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for seeding");
    } catch (error) {
        console.error("DB Connection Error:", error.message);
        process.exit(1);
    }
};

const seedTasks = async () => {
    try {
        await Task.deleteMany(); // clear old data

        const tasks = [];

        const priorities = ["low", "medium", "high"];

        for (let i = 0; i < 10; i++) {
            tasks.push({
                title: faker.lorem.sentence(5),
                description: faker.lorem.paragraph(),
                priority: faker.helpers.arrayElement(priorities),
                status: faker.helpers.weightedArrayElement([
                    { value: "pending", weight: 50 },
                    { value: "complete", weight: 25 },
                    { value: "incomplete", weight: 25 },
                ]),
                dueDate: faker.date.soon({ days: 30 }),
            });
        }

        await Task.insertMany(tasks);

        console.log("Seeded tasks successfully 🚀");
        process.exit();
    } catch (error) {
        console.error("Seeding Error:", error.message);
        process.exit(1);
    }
};

const runSeeder = async () => {
    await connectDB();
    await seedTasks();
};

runSeeder();