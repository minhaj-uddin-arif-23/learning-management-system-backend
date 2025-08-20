import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import User from "models/User";
import { UnauthorizedError } from "utils/customError";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new UnauthorizedError("You have No Token");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) throw new UnauthorizedError("User Not Found");
    next();
  } catch (error) {
    next(new UnauthorizedError("User Not Found"));
  }
};

export const adminAccess = (req: Request,res:Response,next:NextFunction) => {
  if(req.user?.role !== 'admin') throw new UnauthorizedError("Access Only Admin");
  next();
}