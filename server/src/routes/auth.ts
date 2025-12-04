import { Router } from "express";
import verifyUser from "../controllers/user/auth.ts";

const router = Router();

router.get("/verify-user", verifyUser);
export default router;
