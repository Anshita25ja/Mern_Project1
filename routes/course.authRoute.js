import { Router } from 'express';
import upload from "../controller/multer.controller.js";

import { authorizeRoles, isloggedIn } from '../middleware/jwtAuth.js';
const courseRouter =Router();
import {addLectureToCourseById, createCourse, deleteCourseById, getAllCourses, getLecturesByCourseId, updateCourseById} from "../controller/course.controller.js"
courseRouter.post("/createCourse", isloggedIn,upload.single('thumbnail'),createCourse)
courseRouter.get("/getAllCourses", isloggedIn,getAllCourses)
courseRouter.delete("/deleteCourseById/:id",isloggedIn, authorizeRoles('ADMIN'), deleteCourseById)
courseRouter.get("/getLecturesByCourseId/:id",getLecturesByCourseId)
courseRouter.put("/updateCourseById/:id",isloggedIn, authorizeRoles('ADMIN'),updateCourseById)
courseRouter.post("/addLectureToCourseById/:id",isloggedIn,upload.single('lecture'),addLectureToCourseById)




  export default courseRouter