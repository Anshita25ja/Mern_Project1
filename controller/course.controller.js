import Course from "../model/course.model.js"
import fs from 'fs/promises';

import cloudinary from 'cloudinary';

export const getAllCourses=async(req,res)=>{
const courses= await Course.find({}).select('-lectures');


res.status(200).json({
    success: true,
    message: 'All courses',
    courses,
  });
}

export const getLecturesByCourseId=async(req,res)=>{
 const {id}=req.params;
 const course=await Course.findById(id);
 if(!course){
    return  res.status(404).json({
        success: false,
        message: "Invaild Course"
      });
 }
 res.status(200).json({
    success: true,
    message: 'Course lectures fetched successfully',
    lectures: course.lectures,
  }); 
}

export const createCourse = async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;
  
    if (!title || !description || !category || !createdBy) {
        res.status(400).json({
            success: false,
            message: 'All fields are required',
        
          }); 
      
  
    }
    
  
    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: 'dummy',
        secure_url:
          'https://res.cloudinary.com/dcimryj5l/uploads/OMlbr-M4PzfKE6TgjVfobPreqZ8/Img_anshita.pdf',
      },
    });
  
    if (!course) {
      return    res.status(500).json({
        success: false,
        message: "Course could not  Course,please try again"
      });
    }
  
    // Run only if user sends a file
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'lms', // Save files in a folder named lms
          width: 250,
          height: 250,
          gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
          crop: 'fill',
        });
  
    //     // If success
        if (result) {
          // Set the public_id and secure_url in DB
          course.thumbnail.public_id = result.public_id;
          course.thumbnail.secure_url = result.secure_url;
  
          // After successful upload remove the file from local storage
          fs.rm(`uploads/${req.file.filename}`);
        }
      } 
      catch (error) {
        return res.status(400).json({
          success: false,
          message: "File not uploaded, please try again'"
        });
        
      }
    }
    await course.save();

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course,
    });
    }

export const updateCourseById = async (req, res, next) => {
    // Extracting the course id from the request params
    const { id } = req.params;
  
    // Finding the course using the course id
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body, // This will only update the fields which are present
      },
      {
        runValidators: true, // This will run the validation checks on the new data
      }
    );
  
    // If no course found then send the response for the same
    if (!course) {
        res.status(400).json({
            success: false,
            message: 'Invalid course id or course not found.',
       
          });
      
    }
  
    // Sending the response after success
    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
    });
  };

  
  export const deleteCourseById = async (req, res, next) => {
    // Extracting id from the request parameters
    const { id } = req.params;
  
    // Finding the course via the course ID
    const course = await Course.findById(id);
  
    // If course not find send the message as stated below
    if (!course) {
      return     res.status(404).json({
        success: false,
        message: 'Course with given id does not exist.',
      });
     
    }
  
    // Remove course
    await Course.findByIdAndDelete(id);
  
    // Send the message as response
    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  };


  

  export const addLectureToCourseById = async (req, res, next) => {
    const { title, description } = req.body;
    const { id } = req.params;
  
 
    const lectureData={
      title, description,lecture:{
        public_id: 'dummy',
        secure_url:
          'https://res.cloudinary.com/dcimryj5l/uploads/OMlbr-M4PzfKE6TgjVfobPreqZ8/Img_anshita.pdf',
      
      }
    }
  
    if (!title || !description) {

      return res.status(400).json({
        success: false,
        message: 'Title and Description are required',
      });
     
    }
  
    const course = await Course.findById(id);
  

    if (!course) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course id or course not found.',
      });
  
    }
  
 
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'lms', // Save files in a folder named lms
          width: 250,
          height: 250,
          gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
          crop: 'fill',
        });
  
    //     // If success
        if (result) {
          // Set the public_id and secure_url in DB
          lectureData.lecture.public_id =  result.public_id;
          lectureData.lecture.secure_url = result.secure_url;
  
          // After successful upload remove the file from local storage
          fs.rm(`uploads/${req.file.filename}`);
        }
      } 
      catch (error) {
        return res.status(400).json({
          success: false,
          message: "File not uploaded, please try again'"
        });
        
      }
    }
    course.lectures.push(
      lectureData
    );
  
    course.numberOfLectures = course.lectures.length;
  
    // Save the course object
    await course.save();
  
    res.status(200).json({
      success: true,
      message: 'Course lecture added successfully',
      course,
    });
  };
  