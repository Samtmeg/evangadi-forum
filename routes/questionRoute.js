import express, { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { allQuestions, goToQuestion, submitQuestion } from "../controller/questionController.js"

const router = express.Router()

router.get("/all-questions", authMiddleware, allQuestions)


router.get("/goToQuestion", authMiddleware, goToQuestion)


router.post("/submitQuestion", authMiddleware, submitQuestion)



export default router