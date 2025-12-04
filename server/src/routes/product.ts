import { Router } from "express";
import getProducts from "../controllers/products/get.ts";
import createProduct from "../controllers/products/post.ts";

const router = Router();

router.get("/", getProducts);
router.post("/create", createProduct);
export default router;
