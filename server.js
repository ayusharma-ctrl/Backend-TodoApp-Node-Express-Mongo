import { app } from "./app.js";
import { connectDB } from "./data/database.js";

//importing connectDB function, and calling this to connect server with DB
connectDB();

//setting up server
app.listen(process.env.PORT, () => {
    console.log(`Server is working on Port ${process.env.PORT} in ${process.env.NODE_ENV} Mode.`);
})