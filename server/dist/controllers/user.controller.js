"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetails = exports.logout = exports.login = exports.signup = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Fields cannot be empty"
            });
        }
        const exisitingUser = await user_model_1.UserModel.findOne({ email: email });
        if (exisitingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                message: "Username cannot have special characters"
            });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const user = await user_model_1.UserModel.create({
            email: email,
            username: username,
            password: hashedPassword,
            code: []
        });
        const jwtToken = jsonwebtoken_1.default.sign({
            _id: user._id,
            email: user.email
        }, process.env.JWT_KEY, { expiresIn: "1d" });
        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "none",
            secure: true
        });
        return res.status(201).json({
            username: user.username,
            picture: user.picture,
            email: user.email,
            code: user.code
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while creating user"
        });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { userId, password } = req.body;
    try {
        let exisitingUser;
        if (userId.includes("@")) {
            exisitingUser = await user_model_1.UserModel.findOne({ email: userId });
        }
        else {
            exisitingUser = await user_model_1.UserModel.findOne({ username: userId });
        }
        if (!exisitingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const passwordMatch = await bcryptjs_1.default.compare(password, exisitingUser.password);
        if (!passwordMatch) {
            return res.status(403).json({
                message: "Incorrect password"
            });
        }
        const jwtToken = jsonwebtoken_1.default.sign({
            _id: exisitingUser._id,
            email: exisitingUser.email
        }, process.env.JWT_KEY, {
            expiresIn: "1d"
        });
        res.cookie("token", jwtToken, {
            path: "/",
            httpOnly: true,
            sameSite: "none",
            secure: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        });
        exisitingUser.password = "";
        return res.status(200).json({
            username: exisitingUser.username,
            picture: exisitingUser.picture,
            email: exisitingUser.email,
            codes: exisitingUser.code
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while loggin user"
        });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "logged out successfully!" });
    }
    catch (error) {
        return res.status(500).json({ message: "Error logging out!", error });
    }
};
exports.logout = logout;
const userDetails = async (req, res) => {
    const userId = req._id;
    try {
        const user = await user_model_1.UserModel.findById(userId, "-password");
        if (!user) {
            return res.status(404).send({ message: "Cannot find the user!" });
        }
        return res.status(200).send({
            username: user.username,
            picture: user.picture,
            email: user.email,
            code: user.code,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Cannot fetch user details" });
    }
};
exports.userDetails = userDetails;
