import { Router } from "express";
import getProducts from "../controllers/products/get.ts";
import createProduct from "../controllers/products/post.ts";
import editProduct from "../controllers/products/put.ts";
import createSale from "../controllers/sales/post.ts";

const router = Router();

router.post("/create", createSale);
export default router;
