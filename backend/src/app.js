import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middlewares/error.middleware.js";

import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }),
);

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

export default app;
