import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/authRoute.js"
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import busRoute from "./routes/busRoute.js"
import admitRoute from "./routes/admitRoute.js"
// import  cors from "cors"
dotenv.config();


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//   origin:"http://localhost:3000",
//   credentials:true
// }))


app.use("/api/auth",authRoute)
app.use("/api/buses", busRoute)
app.use("/api/admit",admitRoute)


const PORT = process.env.PORT;
app.listen( PORT ,()=>{
  console.log('listening on port 5000');
  connectDB();
})