import { Response, Request, json } from "express";
import CodeModel from "../models/code.model";

const saveCode = async (req: Request, res: Response) => {
    const { code } = req.body
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
export { saveCode }