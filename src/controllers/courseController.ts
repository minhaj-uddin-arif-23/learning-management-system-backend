import { NextFunction, Request, Response } from "express";
import { courseService } from "../services/courseService";
import { ValidationError } from "../utils/customError";

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const thumbnail = req.file?.path;
    const course = await courseService.createCourse({ ...req.body, thumbnail });
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await courseService.getAllCourse();
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await courseService.singleCourseData(req.params.id);
    res.json(course);
  } catch (err) {
    next(err);
  }
};
const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const thumbnail = req.file?.path;
    const course = await courseService.updateCourse(req.params.id, {
      ...req.body,
      thumbnail,
    });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = courseService.deleteCourse(req.params.id);
    res.status(201).send(course);
  } catch (error) {
    next(error);
  }
};

export const courseControllers = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
