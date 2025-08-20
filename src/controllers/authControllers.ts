import { NextFunction, Request, Response } from "express";
import * as authService from "../services/authService";

export const register = async (req:Request,res:Response,next:NextFunction) =>{
    try { 
      const result = await authService.registerUser(req.body);
      res.status(201).json(result); 
    } catch (error) {
        next(error);
    }
}

export const login = async (req:Request,res:Response,next:NextFunction) =>{
    try { 
      const result = await authService.loginUser(req.body);
      res.status(201).json(result); 
    } catch (error) {
        next(error);
    }
}

