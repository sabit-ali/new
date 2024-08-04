import { Router } from "express";
import { deletePostCards } from "../controllers/thread.controller.mjs";

const router = Router()

router.route('/:postId').get(deletePostCards)


export default router