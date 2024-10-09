import express from "express"
import cors from "cors"
import { config } from "dotenv"
import { dbConnect } from "./lib/dbConnect"
import CompilerRouter from "./routes/compiler.route"
import UserRouter from "./routes/user.route"
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
config()
dbConnect()

app.use("/compiler", CompilerRouter)
app.use("/user", UserRouter)


app.listen(PORT, () => {
    console.log("Server is running");

})