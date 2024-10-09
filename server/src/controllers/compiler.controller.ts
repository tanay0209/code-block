import { Response, Request, json } from "express";
import CodeModel from "../models/code.model";
import { CodeType } from "../types/CompilerTypes";

const saveCode = async (req: Request, res: Response) => {
    const code: CodeType = req.body
    if (code.html === '' && code.css === '' && code.javascript === '') {
        return res.status(400).json({
            message: "Code cannot be empty"
        }) as any
    }
    try {
        const newCode = await CodeModel.create({
            code: code
        })
        return res.status(201).send({ id: newCode._id }) as any;
    } catch (error) {
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
export { saveCode, getCode }