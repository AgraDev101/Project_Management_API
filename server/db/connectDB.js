import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        let connect = await mongoose.connect("mongodb+srv://<username>:<password>@cluster0.zefg1.mongodb.net/projects?retryWrites=true&w=majority&appName=Cluster0")
        console.log("database connected", connect.connection.host)   
    } catch (error) {
        console.log(error)
    }
}