const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
   name : {type : String, required : true},
   instructor : {type : String, required : true},
   description : {type : String, required : true},
   enrollmentStatus : {type : String, required : true, enum: ['Open', 'Closed', 'In Progress']},
   thumbnail : {type : String, required : true},
   duration : {type : String, required : true},
   schedule : {type : String, required : true},
   location : {type : String, required : true},
   prerequisites : { type : [String], required : true },
   syllabus: [
    {
      week: { type: Number, required: true },
      topic: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
},{
  versionKey : false
})

const CourseModel = mongoose.model("course", CourseSchema);

module.exports = {CourseModel};


// students: [
//     { id : {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//         required: true,
//     }},
//   ],



