"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCode = void 0;
const saveCode = async (req, res) => {
    try {
        return res.sendStatus(200);
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong while saving"
        });
    }
};
exports.saveCode = saveCode;
