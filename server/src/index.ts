import express from "express"
import cors from "cors"
import { config } from "dotenv"
import { dbConnect } from "./lib/dbConnect"
import compilerRoutes from "./routes/compiler.route"
const app = express()


app.use(express.json())
app.use(cors())
config()
dbConnect()

app.use("/compiler", compilerRoutes)


app.listen(3000, () => {
    console.log("Server is running");

})