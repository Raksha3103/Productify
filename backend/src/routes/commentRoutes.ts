import {Router} from "express";
import  cors from "cors";
import { requireAuth } from "@clerk/express";
import * as commentController from "../controllers/commentController";

const router=Router();

//POST /api/comments/:productId - Create a new comment (protected route)
router.post("/:productId",requireAuth(),commentController.addComment);
//DELETE /api/comments/:id - Delete comment by ID (protected route)
router.delete("/:id",requireAuth(),commentController.deleteComment);
export default router;
