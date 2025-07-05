import express, { json } from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js";
import adminRouter from "./routes/admin.routes.js";
const app =express();

await connectDB()
// Middleware
app.use(cors())
app.use(express.json())
//
const port  = process.env.PORT || 3000;

//Routes
app.get("/",(req,res)=>{
    res.send("Welcome to the server").status(200)
})
app.use('/api/admin',adminRouter)
app.listen(port,()=>{
    console.log("https://localhost:"+port)
}
)
export default app;