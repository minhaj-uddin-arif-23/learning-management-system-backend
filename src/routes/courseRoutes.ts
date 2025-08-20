import { upload } from "../uploads/uploadMiddleware";
import { courseControllers } from "../controllers/courseController";
import { Router } from "express";
import { adminAccess, protectRoute } from "../middlewares/authMiddleware";

const router = Router()

router.get('/',courseControllers.getCourses)

router.get('/:id',courseControllers.getCourseById)

router.post('/addCourse', protectRoute,adminAccess, upload.single('thumbnail'),courseControllers.createCourse)

 
router.put('/:id',protectRoute,adminAccess,upload.single('thumbnail'),courseControllers.updateCourse)

router.delete('/:id',protectRoute,adminAccess,courseControllers.deleteCourse)

export const courseRouter = router