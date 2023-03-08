import "../loadEnvironment.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/errors/errors.js";
import usersRouter from "../router/usersRouter/usersRouter.js";
export const app = express();

const allowedCorsOrigin = [
  process.env.CORS_ALLOWED_ORIGIN_LOCAL!,
  process.env.CORS_ALLOWED_ORIGIN_PRODUCTION!,
];

const options: cors.CorsOptions = {
  origin: allowedCorsOrigin,
};

app.use(cors(options));
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);
