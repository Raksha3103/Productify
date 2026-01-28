import {Router} from "express";
import  cors from "cors";
import { syncUser } from "../controllers/userController";
import { requireAuth } from "@clerk/express";

const router=Router();

///api/users/sync-POST
router.post("/sync",syncUser,requireAuth());
export default router;
