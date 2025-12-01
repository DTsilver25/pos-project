import { Router } from "express";
import getUsers from "../controllers/user/get.ts";
import createUsers from "../controllers/user/post.ts";

const router = Router();

router.get("/", getUsers);
router.post("/create", createUsers);

export default router;
