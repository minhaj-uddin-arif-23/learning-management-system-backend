import Course from "../models/Course";
import { NotFoundError, ValidationError } from "../utils/customError";
import z from "zod";

const courseSchema = z.object({
  
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.number().min(0, "Price must be non-negative"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

// create course
const createCourse = async (data: {
  title: string;
  price: number;
  description: string;
}) => {
  const parsed = courseSchema.safeParse(data);
  if (!parsed.success) throw new ValidationError(parsed.error.message);

  const course = new Course(parsed.data);
  await course.save();
  return course;
};

// get all course

const getAllCourse =async () => {
    const data = await Course.find();
    return data;
}


const singleCourseData = async (id:string) => {
    const course = await  Course.findById(id);
    if(!course){
      throw new NotFoundError("Course not found")
    }
}

const updateCourse = async (id: string, data : Partial<{title:string,price:number,description:string,thumbnail?:string}>) => {
  const parsed = courseSchema.partial().safeParse(data)
  if(!parsed.success) throw new ValidationError(parsed.error.message)

    const course = Course.findByIdAndUpdate(id,data,{new: true});
    if(!course) throw new NotFoundError('Course Not Found');
    return course;
} 

const deleteCourse =async (id:string) =>{
  const course = Course.findByIdAndDelete(id)
  if(!course) throw new NotFoundError('Course not found')
}


export const courseService = {
  createCourse,getAllCourse,singleCourseData,updateCourse,deleteCourse
};