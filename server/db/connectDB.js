import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        let connect = await mongoose.connect("mongodb+srv://username123:123%40123@cluster0.zefg1.mongodb.net/projects?retryWrites=true&w=majority&appName=Cluster0")
        console.log("database connected", connect.connection.host)   
    } catch (error) {
        console.log(error)
    }
}