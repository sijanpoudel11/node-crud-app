const mongoose=require('mongoose');
var bcrypt = require('bcrypt-nodejs');
 var userschema=new mongoose.Schema({
     email:{
         type:String,
         required:true
     },
     password:{
         type:String,
         required:true
     }
   
 });
 userschema.methods.generateHash = function(password){

    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);

};

userschema.methods.validPassword = function(password){

    return bcrypt.compareSync(password, this.password);

};

 module.exports=mongoose.model('user',userschema);