import { Router } from "express";
import {
  rateLimiter,
  protectedRequestMiddleware,
} from "../middlewares/ProtectedRequestMiddleware.js";
import apiRouter from "./api/index.js";
import publicApiRouter from "./public-api/index.js";

const router = Router();

router.use("/public", [rateLimiter], publicApiRouter);
router.use("/", [rateLimiter, protectedRequestMiddleware], apiRouter);

export default router;
