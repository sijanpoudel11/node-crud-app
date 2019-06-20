const mongoose=require('mongoose');
 var newschema=new mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     roll:{
         type:Number,
         required:true
     },
     date:{
         type:Date,
         default:Date.now
     }
     
 })

 module.exports=mongoose.model('student',newschema);