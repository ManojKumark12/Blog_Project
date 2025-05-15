import { Router } from "express";
import { getUser,updateUser } from "../controllers/user.controller.js";
import upload from "../config/multer.js";
const userRouter=Router();
userRouter.get('/get-user/:user_id',getUser);
userRouter.put('/update-user/:user_id',upload.single('file'),updateUser);
export default userRouter;
