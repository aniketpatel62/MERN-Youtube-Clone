// const express = require('express')
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

app.use(cors())
mongoose.set("strictQuery", false);
const connectDB = () => {
  mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to DB')
  }).catch(err => {
    throw err
  })
}

connectDB();

// setting up all the routes we have
// router : where to go
//(takes argument name , redirectes to controler )
// what to do

// allow external json accept
app.use(express.json())

app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

// handeling error
app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || "Something went wrong"
  return res.status(status).json({
    success: false,
    status,
    message
  })
})

// app.post("/api/auth/google")



app.listen(8800, () => {
  console.log('Server running on port 8880')
})