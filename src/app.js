import express, { json } from "express";
import mongooseConnection from "./connections/mongoose.js";
import ErrorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware.js";
import router from "./routes/index.js";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "cookie-session";
import { COOKIE_SECRET_KEY } from "./config/index.js";

const app = express();
app.use(json());

const corsOptions = {
  origin: ["*"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(helmet());
app.use(
  cookieSession({
    name: 'session',
    keys: [COOKIE_SECRET_KEY],
  })
);
app.use("/", router);
app.use(ErrorHandlerMiddleware);

mongooseConnection(app);
