import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middlewares/error.middleware.js";

import taskRoutes from "./routes/task.routes.js";

const app = express();

const allowedOrigins = process.env.CLIENT_URL?.split(",") ?? [];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    }),
);

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

export default app;
