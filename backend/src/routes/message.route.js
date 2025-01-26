import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { getMessages, getUserForSidebar, sendMessage } from '../controllers/message.controller';
const router = express.Router()

router.get("/user", protectRoute, getUserForSidebar)
router.get("/:id", potectRoute, getMessages)

router.post("/send/:id", protectRoute, sendMessage)

export default router;