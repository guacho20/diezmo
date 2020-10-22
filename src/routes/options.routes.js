import { Router } from "express";
import * as optionsCtrl from "../controllers/opions.controller";
const router = Router();

router.get("/menu", optionsCtrl.menuOptions);
router.post("/", optionsCtrl.createOptions);

export default router;