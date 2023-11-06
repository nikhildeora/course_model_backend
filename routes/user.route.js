const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model.js");
const userRoute = express.Router();
const { CourseModel } = require("../models/course.model");
const { Authentication } = require("../middlewares/auth.middleware.js");

userRoute.get("/", async (req, res) => {
  try {
    const allUser = await UserModel.find().populate({
      path: "courseEnroll.id",
      model: "course",
    });
    res.send({ allUser });
  } catch (error) {
    res.send({ message: "while fetcing", error });
}
});

userRoute.get("/userdetail",Authentication, async (req,res)=>{
    const { userId } = req.body;
    try {
        const curUser = await UserModel.findById(userId).populate({
            path: "courseEnroll.id",
            model: "course",
          });
          // const curUser = await UserModel.findById(userId)
          res.send(curUser);
    } catch (error) {
        res.send({ message: "while fetcing", error });
    }
})

userRoute.post("/register", async (req, res) => {
  const { name, email, pass, mobileNo } = req.body;
  try {
    const findUser = await UserModel.find({ email });
    if (findUser.length === 0) {
      bcrypt.hash(pass, 4, async (err, hashedPass) => {
        if (err) {
          throw new Error(err);
        } else {
          let user = new UserModel({ name, email, mobileNo, pass: hashedPass });
          await user.save();
          return res.send({ message: "user Registred successfully" });
        }
      });
    } else {
      return res.send({ message: "user already exist" });
    }
  } catch (err) {
    return res.send({ message: "Error in Registration", error: err });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const findUser = await UserModel.find({ email });
    if (findUser.length > 0) {
      const hashpass = bcrypt.compare(pass, findUser[0].pass);
      if (hashpass) {
        const token = jwt.sign(
          { userId: findUser[0]._id },
          "alemeno_course_app",
          { expiresIn: "1h" }
        );
       return res.send({ message: "Login successfull", token });
      } else {
       return res.send({ message: "wrong credentals" });
      }
    } else {
      return res.send({ message: "wrong credentals" });
    }
  } catch (error) {
    return res.send({ message: "Error in Registration", error: error });
  }
});

userRoute.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await UserModel.findByIdAndDelete(ID);
    res.send({ message: "successfully deleted" });
  } catch (error) {
    res.send({ message: "error while deleting user", error });
  }
});


userRoute.patch("/enroll", Authentication, async (req, res) => {
  const { userId } = req.body;
  const payload = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.send({ message: "user not found" });
    }
    delete payload.userId;
    await UserModel.findByIdAndUpdate({ _id: userId }, payload);
    return res.send({ message: "successfully updated" });
  } catch (error) {
    return res.send({ message: "Error in Enrollment", error: error });
  }
});


userRoute.patch("/coursecomplete", Authentication, async (req, res) => {
  const { userId } = req.body;
  const payload = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.send({ message: "user not found" });
    }
    delete payload.userId;
    await UserModel.findByIdAndUpdate({ _id: userId }, payload);
    return res.send({ message: "successfully updated" });
  } catch (error) {
    return res.send({ message: "Error in Enrollment", error: error });
  }
});


module.exports = { userRoute };


// 65466e1051829cc448fbffb0
// 65466e4851829cc448fbffb4
// 65466e8551829cc448fbffb8
// 65466ecd51829cc448fbffbc