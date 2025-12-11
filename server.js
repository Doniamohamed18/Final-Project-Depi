const express = require("express")
const app = express()

const cors = require("cors")


const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db")
app.use(cookieParser());
connectDB();
app.use(cors({
  origin: "http://localhost:5001", // Your React app's URL
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// app.use(cors())
app.use(express.json())
app.use("/users" ,require("./routes/users"))
app.use("/products" ,require("./routes/products"))
app.use("/category" ,require("./routes/category"))
app.use("/admin" ,require("./routes/admin"))
app.use("/images",express.static("images"))


const PORT  = 5000

app.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`)
})