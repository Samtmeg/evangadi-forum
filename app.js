import dotenv from "dotenv"
dotenv.config()

import express from "express"
import dbconnection from "./db/dbConfig.js"
import userRoutes from "./routes/userRoute.js" //user route middleware file
import questionRoutes from "./routes/questionRoute.js"
import answerRoutes from "./routes/answerRoute.js"
import cors from "cors"

const app = express();
const PORT = 5500;

app.use(cors())
app.use(express.json())

// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
// }));
//user route middleware
app.use("/api/users", userRoutes)

//questions route middleware
app.use("/api/questions", questionRoutes)

//questions route middleware
app.use("/api/answer", answerRoutes)

//question route middleware

//answer route middleware
async function start() {
    try {
        const res = await dbconnection.execute("SELECT 'test' ")
        app.listen(PORT)
        console.log("Databse connection established");
        console.log(`listening on ${PORT}`);
    } catch (error){
        console.log(error.message);
    }
}
start()
console.log(process.env.PASSWORD) 