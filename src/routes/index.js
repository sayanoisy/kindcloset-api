import { Router } from "express";
import {
  rateLimiter,
  protectedRequestMiddleware,
  protectedRequestMiddlewareAdmin,
} from "../middlewares/ProtectedRequestMiddleware.js";
import apiRouter from "./api/index.js";
import publicApiRouter from "./public-api/index.js";
import adminApiRouter from "./admin-api/index.js";

const router = Router();

router.use("/admin", [protectedRequestMiddlewareAdmin], adminApiRouter);
router.use("/public", [rateLimiter], publicApiRouter);
router.use("/", [rateLimiter, protectedRequestMiddleware], apiRouter);

export default router;
