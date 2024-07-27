import { Router } from 'express';
import { authorizeRoles, isloggedIn } from '../middleware/jwtAuth.js';
const courseRouter =Router();
import {addLectureToCourseById, createCourse, deleteCourseById, getAllCourses, getLecturesByCourseId, updateCourseById} from "../controller/course.controller.js"
courseRouter.post("/createCourse",isloggedIn,authorizeRoles('ADMIN'),createCourse)
courseRouter.get("/getAllCourses",getAllCourses)
courseRouter.delete("/deleteCourseById/:id",isloggedIn, authorizeRoles('ADMIN'), deleteCourseById)
courseRouter.get("/getLecturesByCourseId/:id",isloggedIn,getLecturesByCourseId)
courseRouter.put("/updateCourseById/:id",isloggedIn, authorizeRoles('ADMIN'),updateCourseById)
courseRouter.post("/addLectureToCourseById/:id",isloggedIn,authorizeRoles('ADMIN'),addLectureToCourseById)




  export default courseRouter