import { Router } from "express";
import { getGlobalStats } from "../controllers/stats.controller.js";

const router = Router();

router.get("/stats", getGlobalStats);

export default router;