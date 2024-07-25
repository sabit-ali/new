import { app } from "../app.mjs";

import dotenv from 'dotenv'
import connectDB from "./db/mongoose.mjs";
dotenv.config({
    path :'./.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server is running port',process.env.PORT)
    })
})