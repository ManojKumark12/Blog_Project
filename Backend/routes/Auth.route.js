import {Router} from "express";
import { GoogleLogin, Login, LogOut, Register } from "../controllers/auth.controller.js";
const router=Router();
router.post('/register',Register);
router.post('/login',Login);
router.post('/googlelogin',GoogleLogin);
router.get('/logout',LogOut);
export default router;