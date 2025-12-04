import { Router } from "express";
import getUsers from "../controllers/user/get.ts";
import createUsers from "../controllers/user/post.ts";
import deleteUser from "../controllers/user/delete.ts";
import editUser from "../controllers/user/put.ts";

const router = Router();

router.get("/", getUsers);
router.post("/create", createUsers);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

export default router;
