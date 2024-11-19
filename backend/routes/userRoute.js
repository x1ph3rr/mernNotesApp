import express from "express";
import {loginUser, registerUser, getUser} from "../controllers/userController";
import requireAuth from '../middleware/requireAuth';

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/getuser", requireAuth, getUser);

export default router;