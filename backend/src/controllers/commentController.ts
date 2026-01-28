import type {Request,Response} from 'express';
import * as queries from "../db/queries";
import {getAuth} from "@clerk/express";

export async function addComment(req:Request,res:Response){
    try{
        const {userId}=getAuth(req);
        if(!userId){
            return res.status(401).json({message:"Unauthorized"});
        }
        const {productId,content}=req.body;
        if(!productId||!content){
            return res.status(400).json({message:"Missing required fields"});
        }

        const product=await queries.getProductById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }   
        const comment=await queries.createComment({
            productId,
            userId,
            content
        });
        return res.status(201).json({message:"Comment added successfully",comment});
    }

    catch(error){
        console.error("Error adding comment:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export async function deleteComment(req:Request,res:Response){
    try{
        const {userId}=getAuth(req);    
        if(!userId){
            return res.status(401).json({message:"Unauthorized"});
        }
        const {commentId}=req.params;
        if(!commentId){
            return res.status(400).json({message:"Missing comment ID"});
        }
        const comment=await queries.getCommentById(commentId as string);
        if(!comment){
            return res.status(404).json({message:"Comment not found"});
        }
        if(comment.userId!==userId){
            return res.status(403).json({message:"Forbidden"});
        }
        await queries.deleteComment(commentId as string);
        return res.status(200).json({message:"Comment deleted successfully"});
    }
    catch(error){
        console.error("Error deleting comment:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}