"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCodes = exports.updateCode = exports.deleteCode = exports.getUserCodes = exports.getCode = exports.saveCode = void 0;
const code_model_1 = require("../models/code.model");
const user_model_1 = require("../models/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const saveCode = async (req, res) => {
    const { code, title } = req.body;
    let username = "Anonymous";
    let userInfo = undefined;
    let isAuthenticated = false;
    let user = undefined;
    if (code.html === '' && code.css === '' && code.javascript === '' || title == "" || !title) {
        return res.status(400).json({
            message: "Code or title cannot be empty"
        });
    }
    try {
        if (req._id) {
            user = await user_model_1.UserModel.findById(req._id);
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            username = user.username;
            userInfo = user._id;
            isAuthenticated = true;
        }
        const newCode = await code_model_1.CodeModel.create({
            code: code,
            user: userInfo,
            username: username,
            title: title
        });
        if (isAuthenticated && user) {
            user.code.push(newCode._id);
            user.save();
        }
        return res.status(201).send({ id: newCode._id });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while saving"
        });
    }
};
exports.saveCode = saveCode;
const getCode = async (req, res) => {
    const userId = req._id;
    const { id } = req.params;
    let isCodeOwner = false;
    try {
        const existingCode = await code_model_1.CodeModel.findById(id);
        if (!existingCode) {
            return res.status(404).json({
                message: "Code not found"
            });
        }
        const updatedUserId = new mongoose_1.default.Types.ObjectId(userId);
        if (existingCode.user.equals(updatedUserId)) {
            isCodeOwner = true;
        }
        return res.status(200).json({
            code: existingCode.code,
            isOwner: isCodeOwner
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong while fetching code"
        });
    }
};
exports.getCode = getCode;
const getUserCodes = async (req, res) => {
    try {
        const exisistingUser = await user_model_1.UserModel.findById(req._id).populate({
            path: "code", options: {
                sort: {
                    createdAt: -1
                }
            }
        });
        if (!exisistingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            codes: exisistingUser.code
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error loading the codes"
        });
    }
};
exports.getUserCodes = getUserCodes;
const deleteCode = async (req, res) => {
    const { id } = req.params;
    let currentUserId = req._id;
    try {
        const existingCode = await code_model_1.CodeModel.findById(id);
        if (!existingCode) {
            return res.status(404).json({
                message: "Code not found"
            });
        }
        const user = await user_model_1.UserModel.findById(existingCode.user);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        let userId = new mongoose_1.default.Types.ObjectId(currentUserId);
        if (!userId.equals(user._id)) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }
        const deletedCode = await code_model_1.CodeModel.findByIdAndDelete(id);
        return res.status(200).json({
            codeId: id
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong while deleting the code"
        });
    }
};
exports.deleteCode = deleteCode;
const updateCode = async (req, res) => {
    const userId = req._id;
    try {
        const { id } = req.params;
        const updatedCode = req.body;
        const code = await code_model_1.CodeModel.findById(id);
        if (!code) {
            return res.status(404).json({
                message: "Code not found"
            });
        }
        const updatedUserId = new mongoose_1.default.Types.ObjectId(userId);
        if (!updatedUserId.equals(userId)) {
            return res.status(403).json({
                message: "You dont have permission to update this code."
            });
        }
        const editedCode = await code_model_1.CodeModel.findByIdAndUpdate(id, {
            code: updatedCode
        });
        return res.status(200).json({
            message: "Post updated successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong while editing the code"
        });
    }
};
exports.updateCode = updateCode;
const getAllCodes = async (req, res) => {
    try {
        const codes = await code_model_1.CodeModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            codes: codes
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong while fetching codes"
        });
    }
};
exports.getAllCodes = getAllCodes;
