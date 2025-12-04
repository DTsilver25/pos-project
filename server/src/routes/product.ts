import { Router } from "express";
import getProducts from "../controllers/products/get.ts";
import createProduct from "../controllers/products/post.ts";
import editProduct from "../controllers/products/put.ts";

const router = Router();

router.get("/", getProducts);
router.post("/create", createProduct);
router.put("/edit/:id", editProduct);
export default router;
