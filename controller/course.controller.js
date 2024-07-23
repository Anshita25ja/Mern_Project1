import Course from "../model/course.model.js"
export const getAllCourses=async(req,res)=>{
const details= await Course.find({}).select('-lectures');


res.status(200).json({
    success: true,
    message: 'All courses',
    details,
  });
}
export const getLecturesByCourseId=async(req,res)=>{
 const {id}=req.params;
 const course=await Course.findById(id);
 if(!Course){
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
    });
  
    if (!course) {
      return    res.status(500).json({
        success: false,
        message: "Course could not  Course,please try again"
      });
    }
  
    // Run only if user sends a file

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
    await course.remove();
  
    // Send the message as response
    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  };
