import { Request, Response, NextFunction } from "express";
import { moduleService } from "../services/moduleService";

const createModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const module = await moduleService.createModel(req.body);
    res.status(201).json(module);
  } catch (err) {
    next(err);
  }
};

const getModulesByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const modules = await moduleService.getModulesByCourse(req.params.courseId);
    res.json(modules);
  } catch (err) {
    next(err);
  }
};

const getModuleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const module = await moduleService.getModuleById(req.params.id);
    res.json(module);
  } catch (err) {
    next(err);
  }
};

const updateModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const module = await moduleService.updateModule(req.params.id, req.body);
    res.json(module);
  } catch (err) {
    next(err);
  }
};

const deleteModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await moduleService.deleteModule(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const moduleControllers = {
  createModule,
  getModulesByCourse,
  getModuleById,
  updateModule,
  deleteModule,
};
