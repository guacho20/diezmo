import { Router } from "express";
import * as indexCtrl from "../controllers/index.controller";
const router = Router();

router.get('/', indexCtrl.index);

export default router;