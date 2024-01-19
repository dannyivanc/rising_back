const Course = require("../models/course");
const image = require("../utils/image");
const fs = require('fs');
const path = require('path');

async function createCourse(req, res) {
  const course = new Course(req.body);
  const imagePath = image.getFilePath(req.files.file);

  course.miniature = `${imagePath}`;  
  course.save((error, courseStored) => {
    if (error) {
      borrar(imagePath)
      res.status(400).send({ msg: "Error al crear el curso" });
    } else {
      res.status(201).send(courseStored);
    }
  });
}

 async function getCourse(req, res) {
  // console.log(req.query)
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_at: "desc" },
  };

  Course.paginate({}, options, (error, courses) => {
    // console.log(courses)
    if (error) {
      res.status(400).send({ msg: "Error al obtener los cursos" });
    } else {
      res.status(200).send(courses);
    }
  });
}

async function getAllCourses(req, res) {    
  response = await Course.find();
  res.status(200).send(response);
}


// async function updateCourse(req, res) {
//   const { id } = req.params;
//   const courseData = req.body;
//   Course.findById(id, (err, oldCourse) => {
//     if (err) {
//       return res.status(500).send({ msg: "Error al obtener información del curso" });
//     }

//     // const oldImagePath = path.join(__dirname,`../uploads/${ oldCourse.miniature}`);
//     const oldImagePath = path.join(__dirname,`../uploads/${ oldCourse.miniature}`);
//     if (req.files.file) { 
//       const imagePath = image.getFilePath(req.files.file);
//       courseData.miniature = imagePath;     
//       console.log('-------')
//       console.log(oldCourse)
//         console.log(oldImagePath)
//         console.log('-------')
//       fs.unlink(oldImagePath, (unlinkErr) => {        
//         if (unlinkErr) {
//           console.error("Error al eliminar la imagen antigua:", unlinkErr);
//         }
//       });
//     }

//     Course.findByIdAndUpdate(id, courseData, (error) => {
//       if (error) {
//         res.status(400).send({ msg: "Error al actualizar el curso" });
//       } else {
//         res.status(200).send({ msg: "Actualización correcta" });
//       }
//     });
//   });
// }

async function updateCourse(req, res) {
  try{
    const { id } = req.params;    
    const courseData = req.body;
    const course=  await Course.findById(id)   
    console.log('------')
    console.log(courseData)
    console.log(course)
    console.log(req.files)
    console.log('------')
    if(course){  
      borrar(course.miniature)
      const imagePath = image.getFilePath(req.files.file);      
      courseData.miniature = `${imagePath}`;  
      await Course.findByIdAndUpdate(id, courseData);    
      res.status(200).send({ msg: "Actualización correcta" });
    } 
  }
  catch(err){
      const imagePath = image.getFilePath(req?.files?.file);
      borrar(imagePath) 
      res.status(500).send({ msg: `Error interno del servidor` });
  }
}

async function deleteCourse(req, res) {
  const { id } = req.params;
  const course=  await Course.findById(id)   
  Course.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el curso" });
    } else {
      borrar(course.miniature)
      res.status(200).send({ msg: "Curso eliminado" });
    }
  });
}


const borrar=(cursos)=>{
  console.log(cursos)
  if (cursos) { 
    const ruta = path.join(__dirname,`../uploads/${cursos}`);  
    fs.unlink(ruta, (unlinkErr) => {        
      if (unlinkErr) {
        console.error("Error al eliminar la imagen antigua:", unlinkErr);
      }
    });
  }
}

module.exports = {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  getAllCourses
};
