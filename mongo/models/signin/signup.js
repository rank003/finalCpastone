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

 password:{
    type:String,
    required:true
 },

 


});
 const LogInformation= mongoose.model('Signup',LoginSchema);
 module.exports=LogInformation