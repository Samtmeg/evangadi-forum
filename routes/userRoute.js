import express, { Router } from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import {register, login, checkUser, getUsername, forgotPassword, resetPassword,} from "../controller/userController.js"

const router = express.Router()

//register route
router.post("/register", register)

//login user route
router.post("/login", login)

//check user route
router.get("/check", authMiddleware, checkUser)

router.get("/username", authMiddleware, getUsername)

router.post("/forgot", forgotPassword)

router.post("/reset", resetPassword)

export default router