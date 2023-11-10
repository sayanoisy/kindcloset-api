import express, { json } from "express";
import mongooseConnection from "./connections/mongoose.js";
import userRouter from "./routes/api/userAuth.js";
import ErrorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware.js";

const app = express();
app.use(json());
app.use("/", userRouter);
app.use(ErrorHandlerMiddleware);

mongooseConnection(app);
