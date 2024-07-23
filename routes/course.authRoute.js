import express from 'express'
import { createCourse, getAllCourses, getLecturesByCourseId, updateCourseById } from '../controller/course.controller.js';
import { authorizeRoles, isloggedIn } from '../middleware/jwtAuth.js';
const courseRouter =express.Router();


courseRouter
  .route('/')
  .get(getAllCourses)
  .post(
    isloggedIn,
    authorizeRoles('ADMIN'),

    createCourse
  )
 


  courseRouter
  .route('/:id')
  .get(isloggedIn, getLecturesByCourseId) // Added authorizeSubscribers to check if user is admin or subscribed if not then forbid the access to the lectures

  .put(isloggedIn, authorizeRoles('ADMIN'), updateCourseById);

export default courseRouter