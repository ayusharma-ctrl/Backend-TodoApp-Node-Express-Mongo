import mongoose from "mongoose"

//connecting app with database,
//1.We enter URI of DB, then options,i.e., dbName
//2.It will return a promise 
export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "todo-backend",
    }).then(() => {
        console.log("Database Connected!")
    }).catch((e) => console.log(e));
}