import type{Request,Response } from "express";
import * as queries from "../db/queries";
import {getAuth} from "@clerk/express";

export async function getAllProducts(req:Request,res:Response){
    try{
        const products=await queries.getAllProducts();
        return res.status(200).json({products});
    }catch(error){
        console.error("Error fetching products:",error);
        return res.status(500).json({message:"Internal server error"});
    }   }

export async function getProductById(req:Request,res:Response){
    try{
        const {id}=req.params;
        const product=await queries.getProductById(id as string);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json({product});
    }catch(error){
        console.error("Error fetching product:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const getMyProducts=async(req:Request,res:Response)=>{
    try{
        const {userId}=getAuth(req);        
        if(!userId){
            return res.status(401).json({message:"Unauthorized"});
        }   
        const products=await queries.getProductsByUserId(userId);
        return res.status(200).json({products});
    }catch(error){
        console.error("Error fetching user's products:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export async function createProduct(req:Request,res:Response){
    try{
        const {userId}=getAuth(req);
        if(!userId){
            return res.status(401).json({message:"Unauthorized"});
        }   
        const {title,description,image_url}=req.body;
        if(!title||!description||!image_url){
            return res.status(400).json({message:"Missing required fields"});
            
        }
        const product=await queries.createProduct({
            title,
            description,
            imageUrl:image_url,
            userId
        });
        return res.status(201).json({message:"Product created successfully",product});
    }catch(error){
        console.error("Error creating product:",error);
        return res.status(500).json({message:"Internal server error"});
    }       
}

export async function updateProduct(req:Request,res:Response){
    try{
        const {userId}=getAuth(req);
        if(!userId){
            return res.status(401).json({message:"Unauthorized"});
        }
        const {id}=req.params;
        const existingProduct=await queries.getProductById(id as string);
        if(!existingProduct){
            return res.status(404).json({message:"Product not found"});
        }
        if(existingProduct.userId!==userId){
            return res.status(403).json({message:"Forbidden"});
        }   
        const {title,description,image_url}=req.body;
        const updatedProduct=await queries.updateProduct(id as string,{
            title,
            description,
            imageUrl:image_url,
        });
        return res.status(200).json({message:"Product updated successfully",updatedProduct});   
    }catch(error){
        console.error("Error updating product:",error);
        return res.status(500).json({message:"Internal server error"});    
    }
}

export async function deleteProduct(req:Request,res:Response){
    try{
        const {userId}=getAuth(req);
        if(!userId){
            return res.status(401).json({message:"Unauthorized"});
        }
        const {id}=req.params;
        const existingProduct=await queries.getProductById(id as string);
        if(!existingProduct){
            return res.status(404).json({message:"Product not found"});
        }
        if(existingProduct.userId!==userId){
            return res.status(403).json({message:"Forbidden"});
        }
        await queries.deleteProduct(id as string);
        return res.status(200).json({message:"Product deleted successfully"});
    }catch(error){
        console.error("Error deleting product:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}
