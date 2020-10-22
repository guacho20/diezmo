import { Router } from "express";
import * as rolsCtrl from "../controllers/rols.controller";
const router = Router();

router.get("/", rolsCtrl.getRols);
router.get("/:id", rolsCtrl.getRolsById);
router.post("/", rolsCtrl.createRols);
router.put("/:id", rolsCtrl.updateRols);
router.delete("/:id", rolsCtrl.deleteRols);

export default router;