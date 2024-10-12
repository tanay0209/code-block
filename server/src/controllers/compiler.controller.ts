
import { AuthRequest } from './../middleware/verify-token-anonymous';
import { Response, Request, json } from "express";
import { CodeModel } from "../models/code.model";
import { CodeType } from "../types/CompilerTypes";
import { UserModel } from '../models/user.model';
import mongoose from 'mongoose';

const saveCode = async (req: AuthRequest, res: Response) => {
    const { code, title }: { code: CodeType, title: string } = req.body

    let username = "Anonymous"
    let userInfo = undefined
    let isAuthenticated = false;
    let user = undefined
    if (code.html === '' && code.css === '' && code.javascript === '' || title == "" || !title) {
        return res.status(400).json({
            message: "Code or title cannot be empty"
        }) as any
    }

    try {
        if (req._id) {
            user = await UserModel.findById(req._id)
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                }) as any
            }
            username = user.username
            userInfo = user._id
            isAuthenticated = true
        }
        const newCode = await CodeModel.create({
            code: code,
            user: userInfo,
            username: username,
            title: title
        })
        if (isAuthenticated && user) {
            user.code.push(newCode._id)
            user.save()
        }
        return res.status(201).send({ id: newCode._id }) as any;
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Something went wrong while saving"
        }) as any;
    }
};

const getCode = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const existingCode = await CodeModel.findById(id)
        if (!existingCode) {
            return res.status(404).json({
                message: "Code not found"
            })
        }
        return res.status(200).json({
            code: existingCode.code
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while fetching code"
        }) as any;
    }
}

const getUserCodes = async (req: AuthRequest, res: Response) => {
    try {
        const exisistingUser = await UserModel.findById(req._id).populate({
            path: "code", options: {
                sort: {
                    createdAt: -1
                }
            }
        });
        if (!exisistingUser) {
            return res.status(404).json({
                message: "User not found"
            }) as any
        }
        return res.status(200).json({
            codes: exisistingUser.code
        }) as any
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error loading the codes"
        }) as any
    }
}

const deleteCode = async (req: AuthRequest, res: Response) => {
    const { id } = req.params
    let currentUserId = req._id
    try {
        const existingCode = await CodeModel.findById(id);
        if (!existingCode) {
            return res.status(404).json({
                message: "Code not found"
            }) as any
        }

        const user = await UserModel.findById(existingCode.user)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            }) as any
        }
        let userId = new mongoose.Types.ObjectId(currentUserId)

        if (!userId.equals(user._id)) {
            return res.status(403).json({
                message: "Unauthorized"
            }) as any
        }

        const deletedCode = await CodeModel.findByIdAndDelete(id)

        return res.status(200).json({
            codeId: id
        })


    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while deleting the code"
        }) as any
    }
}


const updateCode = (req: AuthRequest, res: Response) => {
    try {

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while editing the code"
        }) as any
    }
}

export { saveCode, getCode, getUserCodes, deleteCode, updateCode }