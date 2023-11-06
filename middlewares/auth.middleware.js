const jwt = require("jsonwebtoken");

function Authentication(req,res,next){
      const token = req.headers.authorization;
      jwt.verify(token, "alemeno_course_app",(err,decod)=>{
            if(err){
            //    unauthorize to do this request    
              return res.status(401).json({"message": "Please Login first", "error": err})
            }else{
               req.body.userId = decod.userId;
               next();
            }
      })
};

module.exports = {Authentication};