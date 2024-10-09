import mongoose from "mongoose";


interface ICodeSchema {
    code: {
        html: string,
        css: string,
        javascript: string
    }
}

const CodeSchema = new mongoose.Schema<ICodeSchema>({
    code: {
        html: String,
        css: String,
        javascript: String
    }
}, { timestamps: true })


const CodeModel = (mongoose.models.Code as mongoose.Model<ICodeSchema>) || mongoose.model<ICodeSchema>("Code", CodeSchema)

export default CodeModel