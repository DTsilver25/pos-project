import { Router } from "express";
import getUsers from "../controllers/user/get.ts";

 const router = Router()

 router.get("/", getUsers)

 export default router