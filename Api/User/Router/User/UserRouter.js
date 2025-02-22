import Registration from "../../Auth/Register.js";
import { Router  } from "express";
import Login from "../../Auth/Login.js";
const router = Router()


router.post('/register',Registration)
router.post('/login',Login)
export default router