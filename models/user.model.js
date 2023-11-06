const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true},
    mobileNo : {type:Number,required:true},
    pass : {type:String,required:true},
    courseEnroll : [
        {
            id : {
                type: mongoose.Schema.ObjectId,
                ref: "course",
                required: true,
            },
            status : {type:Boolean, required:true, default:false}
        }
    ]
},{
    versionKey : false
});

const UserModel = mongoose.model("user",UserSchema);

module.exports = {UserModel};
