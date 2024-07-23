import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRotes from "./routes/authRote.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import courseRouter from "./routes/course.authRoute.js";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extented:true})) //url help parse param
app.use(cookieParser())
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRotes);
app.use("/api/v1/course",courseRouter)
//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
