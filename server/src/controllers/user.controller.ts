import { Request, Response } from "express"
import { UserModel } from "../models/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { AuthRequest } from "../middleware/verify-token"


const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    const usernameRegex = /^[a-zA-Z0-9]+$/
    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Fields cannot be empty"
            }) as any
        }

        const exisitingUser = await UserModel.findOne({ email: email })
        if (exisitingUser) {
            return res.status(400).json({
                message: "Email already registered"
            }) as any
        }

        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                message: "Username cannot have special characters"
            }) as any
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await UserModel.create({
            email: email,
            username: username,
            password: hashedPassword,
            code: []
        })

        const jwtToken = jwt.sign({
            _id: user._id,
            email: user.email
        },
            process.env.JWT_KEY!,
            { expiresIn: "1d" })

        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "none",
            secure: true
        })

        return res.status(201).json({
            username: user.username,
            picture: user.picture,
            email: user.email,
            code: user.code
        }) as any
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while creating user"
        }) as any
    }
}

const login = async (req: Request, res: Response) => {
    const { userId, password } = req.body
    try {
        let exisitingUser;
        if (userId.includes("@")) {
            exisitingUser = await UserModel.findOne({ email: userId })
        } else {
            exisitingUser = await UserModel.findOne({ username: userId })
        }
        if (!exisitingUser) {
            return res.status(404).json({
                message: "User not found"
            }) as any
        }
        const passwordMatch = await bcrypt.compare(password, exisitingUser.password)

        if (!passwordMatch) {
            return res.status(403).json({
                message: "Incorrect password"
            }) as any
        }
        const jwtToken = jwt.sign({
            _id: exisitingUser._id,
            email: exisitingUser.email
        },
            process.env.JWT_KEY!,
            {
                expiresIn: "1d"
            })

        res.cookie("token", jwtToken, {
            path: "/",
            httpOnly: true,
            sameSite: "none",
            secure: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        })
        exisitingUser.password = ""
        return res.status(200).json({
            username: exisitingUser.username,
            picture: exisitingUser.picture,
            email: exisitingUser.email,
            codes: exisitingUser.code
        }) as any
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while loggin user"
        }) as any
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "logged out successfully!" }) as any;
    } catch (error) {
        return res.status(500).json({ message: "Error logging out!", error }) as any;
    }
};

const userDetails = async (req: AuthRequest, res: Response) => {
    const userId = req._id;
    try {
        const user = await UserModel.findById(userId, "-password");
        if (!user) {
            return res.status(404).send({ message: "Cannot find the user!" }) as any;
        }
        return res.status(200).send({
            username: user.username,
            picture: user.picture,
            email: user.email,
            code: user.code,
        }) as any;
    } catch (error) {
        return res.status(500).json({ message: "Cannot fetch user details" }) as any;
    }
};


export { signup, login, logout, userDetails }