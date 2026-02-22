import mongoose from "mongoose";

let isConnected = false //track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log("MongoDB is Connected successfully")
        return
    }
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            dbName:"artoria",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected=true
        console.log("MongoDB Connected")
    }catch (err){
        console.log(err)
    }
}