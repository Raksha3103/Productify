import express from "express"
import {ENV} from "./config/env"
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'

const app=express();


app.use(cors({origin:ENV.FRONTEND_URL}));
app.use(clerkMiddleware());//auth object will be attavhed to the req
app.use(express.json());//parses json request bodies
app.use(express.urlencoded({extended:true}));//parses urlencoded request bodies

app.get("/",(req,res)=>{

    res.json({
        message:"PostgreSQL with Express and TypeScript",
        endpoints:{
            users:"api/users",
            products:"api/products",
            comments:"api/comments",

        }
    })
})
app.listen(ENV.PORT,()=>console.log("Server is up and running on port:",ENV.PORT))