import express, { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { getAnswers, postAnswer } from "../controller/answerController.js"

const router = express.Router()

router.get("/getAnswers", authMiddleware, getAnswers)

router.post("/postAnswer", authMiddleware, postAnswer)

export default router