import bcrypt from "bcryptjs";
import { handleError } from "../helpers/errorhandler.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
export const getUser=async (req,res,next)=>{
    try{
    const {user_id}=req.params;
    const user=await User.findOne({_id:user_id}).lean().exec();
    if(!user){
        return next(handleError(404,"User Not Found"));
    }
    res.status(200).json({
        success:true,
        message:"user Found",
        user
    })
}catch(err){
    next(handleError(500,err.message));
}
}


export const updateUser=async (req,res,next)=>{
    try{
       const data=JSON.parse(req.body.data);
    //    console.log(req.params);
       const {user_id}=req.params;
       const user=await User.findById(user_id);
       user.name=data.name;
       user.email=data.email;
       user.bio=data.bio;
       if(data.password && data.password.length >=8){
          const hashedPassword =bcrypt.hashSync(data.password);
          user.password=hashedPassword;
        }
        if(req.file){
              // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           req.file.filePath, {
            folder:'yt-mern-blog',resource_type:'auto'
           }
       )
       .catch((error) => {
           console.log(error.message);
        next(handleError(500,error.message));
       });
       user.avatar=uploadResult.secure_url;
        }
        await user.save();
            const new_user = user.toObject({ getters: true });
        delete new_user.password;
res.status(200).json({
    success:true,
    message:"Data Updated",
    user:new_user
});
    }
    catch(error){
        next(handleError(500,error.message));
    }
}