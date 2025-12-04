import { Router } from "express";
import createSale from "../controllers/sales/post.ts";
import getSales from "../controllers/sales/get.ts";

const router = Router();

router.post("/create", createSale);
router.get("/", getSales);
export default router;
