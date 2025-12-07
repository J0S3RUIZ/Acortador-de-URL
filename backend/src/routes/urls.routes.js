import {
  getUrl,
  getUrlById,
  addUrl,
  deleteUrl,
  deleteAllUrl,
  updateUrl,
  patchUrlClick
} from "../controllers/urls.controller.js";

import { Router } from "express";
import { validateUrlData, validateIdParam, validateUpdateUrl } from "../middleware/dataValidator.js";

const router = Router();

router.get("/url", getUrl);

router.get("/url/:id", validateIdParam, getUrlById);

router.post("/url", validateUrlData, addUrl);

router.delete("/url/:id", validateIdParam, deleteUrl);

router.delete("/url", deleteAllUrl);

router.put("/url/:id", validateUpdateUrl, updateUrl);

router.patch("/url/:id", validateIdParam, patchUrlClick);

export default router;
