import express from "express";
import userRouter from './routes/users.js'
import taskRouter from './routes/tasks.js'
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"

//creating app
export const app = express();

//setting up config.env file so that we can use content of it
config({
    path: "./data/config.env"
})

//using middleware
//we are sending json data, that's why it is required to use the middleware, we have to use it before using router
//otherwise json data will not be send and it will not work
app.use(express.json());
//to read the token
app.use(cookieParser())
//using cors cuz we have different url's, local & deployed
//credentials: true to pass headers,cookies to browser/frontend
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
//sharing router we are doing route-splitting, basically '/users' will be a part of each route
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);


//home route
app.get("/", (req, res) => {
    res.send("Working")
})
