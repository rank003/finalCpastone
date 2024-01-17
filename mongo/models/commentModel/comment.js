const mongoose= require('mongoose')

const LoginSchema=new mongoose.Schema({
 name:{
    type:String,
     required:true
 },

  email:{
    type:String,
     required:true
 },

 opinion:{
    type:String,
    required:true
 },

 


});
 const Comment= mongoose.model('Signup',LoginSchema);
 module.exports=Comment