import express from "express";
import {addTask, getTask, removeTask} from "../controllers/taskController";
import requireAuth from "../middleware/requireAuth";

const router = express.Router();

router.post("/addTask", addTask);
router.get("/removeTask", removeTask); //use delete when done
router.get("/getTask"/ requireAuth, getTask);

export default router;