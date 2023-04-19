import express  from "express"
import  dotenv  from "dotenv"
import connectDB from "./config/db.js"
import morgan from "morgan"
dotenv.config();
const app=express()
import cors from 'cors'

import cookieParser from "cookie-parser"

//cookies and filemiddleware
app.use(cookieParser())
app.use(cors())


// morgan middlewares
app.use(morgan("tiny"))

// regular middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// import all routes here
import userRoutes from "./routes/user.routes.js"
import processRoutes from "./routes/process.routes.js"
import requestRoutes from "./routes/requests.routes.js"
import applicationRoutes from "./routes/application.routes.js"

// router middleware
app.use("/api/user",userRoutes);
app.use("/api/process",processRoutes)
app.use("/api/application",applicationRoutes)

app.use("/api/requests",requestRoutes);
export default app;