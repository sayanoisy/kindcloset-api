import express, { json } from "express";
import mongooseConnection from "./connections/mongoose.js";
import userAuthRouter from "./routes/api/userAuth.js";
import ErrorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware.js";
import userRouter from "./routes/api/user.js";

const app = express();
app.use(json());
app.use("/auth/", userAuthRouter);
app.use("/user/", userRouter);
app.use(ErrorHandlerMiddleware);

mongooseConnection(app);
