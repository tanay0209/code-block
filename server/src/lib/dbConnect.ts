import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}

export const dbConnect = async () => {

    if (connection.isConnected) {
        console.log("DB already connected");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!)
        connection.isConnected = db.connections[0].readyState
        console.log("DB connected");
    } catch (error) {
        console.log("DB connected failed", error);
        process.exit(1)
    }
}