import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export interface AuthRequest extends Request {
    _id?: string;
}

const verifyToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: "You are unauthorized." }) as any
    }
    jwt.verify(
        token,
        process.env.JWT_KEY!,
        (err: JsonWebTokenError | null, data: any) => {
            if (err) {
                return res.status(403).json({ message: "You are unauthorized." }) as any;
            }
            req._id = data._id;
            next();
        }
    );
};

export { verifyToken }