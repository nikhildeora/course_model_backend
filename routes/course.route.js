const express = require("express");
const courseRoute = express.Router();
const {CourseModel} = require("../models/course.model");

courseRoute.get("/", async(req,res)=>{
    try {
        const allCourses = await CourseModel.find();
        res.send({"message":"Successfully fetched courses", data : allCourses});
    } catch (error) {
        res.send({"message":"Error while fetching courses",error})
    }
});

courseRoute.get("/:id", async (req,res) => {
    const ID = req.params.id;
    try {
        const course = await CourseModel.findById(ID);
        if(!course){
            res.send({"message":"This Course does not exist"});
        }else{
            res.send({"message": "Successfully fetch", course});
        }
    } catch (error) {
        res.send({"message":"Error while fetching course",error})
    }
})

courseRoute.post("/create", async (req,res) => {
    try {
        const newCourse = new CourseModel(req.body);
        await newCourse.save();
        res.send({"message":"course created successfully"});
    } catch (error) {
        res.send({"message":"Error while creating course",error})
    }
})



module.exports = {courseRoute};