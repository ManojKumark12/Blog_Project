import { handleError } from "../helpers/errorhandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        // user already exists
        if (user) {
            return next(handleError(409, "User already exists"));
        }
        // register user
        const hashedPassword = bcrypt.hashSync(password);
        await User.create({ name, email, password: hashedPassword });
        return res.status(200).json({
            success: true,
            message: "Registration successful"
        });


    } catch (error) {
        next(handleError(500, error.message));
    }
}

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // console.log(await User.findOne().lean());
        const user = await User.findOne({ email: email });

        if (!user) {
            return next(handleError(404, "User Not Found"));
            // return alert("Not found");
        }
        const hashedPassword = user.password;
        const comparePassword = await bcrypt.compare(password, hashedPassword);
        if (!comparePassword) {
            return next(handleError(500, "Passwords dont match"));
        }
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET);
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            path: '/'
        })
        const new_user = user.toObject({ getters: true });
        delete new_user.password;
        return res.status(200).json({
            success: true,
            user:new_user,
            message: "Login successful"
        });
    }
    catch (err) {
        next(handleError(500, err.message));
    }
}


export const GoogleLogin = async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body;
        let user = await User.findOne({ email: email });

        if (!user) {
            const password = Math.random().toString();
            const hashedPassword =bcrypt.hashSync(password);
            // const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds

            // create new user
            const newUser = new User({
                name, email, password: hashedPassword, avatar
            });
            user = await newUser.save();
        }
        
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET);


        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            path: '/'
        })
        const new_user = user.toObject({ getters: true });
        delete new_user.password;
        return res.status(200).json({
            success: true,
            user:new_user,
            message: "Login successful"
        });
    }
    catch (err) {
        next(handleError(500, err.message));
    }
}


export const LogOut = async (req, res, next) => {
    try {
        // Clear the cookie with the token
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // for production
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: "LogOut successful"
        });
    } catch (err) {
        next(handleError(500, err.message));
    }
};
