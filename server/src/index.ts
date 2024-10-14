import express from "express"
import cors from "cors"
import { config } from "dotenv"
import { dbConnect } from "./lib/dbConnect"
import cookieParser from "cookie-parser"

import CompilerRouter from "./routes/compiler.route"
import UserRouter from "./routes/user.route"

config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.set("trust proxy", 1)


dbConnect()

app.use("/compiler", CompilerRouter)
app.use("/user", UserRouter)


app.listen(PORT, () => {
    console.log("Server is running");
})