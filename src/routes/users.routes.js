import { Router } from "express";
import * as usersCtrl from "../controllers/users.controller";
const router = Router();

router.get("/", usersCtrl.find);
router.get("/:id", usersCtrl.FindByOne);
router.get("/:id", usersCtrl.changePassword);

export default router;