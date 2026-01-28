import type {Request,Response} from 'express';
import * as queries from "../db/queries";

import {getAuth} from "@clerk/express";
export async function syncUser(req:Request,res:Response){
try{
    const {userId}=getAuth(req)
    if(!userId){
        return res.status(401).json({message:"Unauthorized"})
}
    const {email,name,imageUrl}=req.body;
    if(!email||!name||!imageUrl){
        return res.status(400).json({message:"Missing required fields"});
    }
    const user=await queries.upsertUser({
        id:userId,
        email,
        name,   
        imageUrl
    });
    return res.status(200).json({message:"User synced successfully",user});
}catch(error){
    console.error("Error syncing user:",error);
    return res.status(500).json({message:"Internal server error"});
}}