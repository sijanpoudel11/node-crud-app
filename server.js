
const express=require('express');
const mongoose=require('mongoose');
var student=require('./database/operations');
const http=require('http');
const fs=require('fs');
mongoose.connect('mongodb://localhost/crud',{ useNewUrlParser: true });
var student=require('./database/operations');

const bodyparser=require('body-parser');


const app=express();



//middleware
mongoose.Promise=global.Promise;
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');

 //home page
    app.get('/',function(req,res){

        res.sendFile(__dirname + '/views/index.html');
            console.log('home page routed');
    });
//retrive all stuents
    app.get('/get-all',function(req,res){

        student.find({})
        .then(persons=>{
            res.render('retrive',{persons});
        })
        .catch(error=>{
            res.send(error);
        })


    
    })

    app.get('/home',function(req,res){

        res.sendFile(__dirname + '/views/index.html');
        console.log('home page routed');
})
app.get('/about/:name',function(req,res){

    res.sendFile(__dirname +'/views/about.html');
    console.log('about page of student '+req.params.name);
    console.log(req.params);
})
app.get('/insert',function(req,res){

    res.render('insert');
    console.log('form page routed');
})
app.post('/insert',  function(req,res){
    var name=req.body.name;
        var roll =req.body .roll;
    var std=new student({
        name:name,
        roll:roll
    });
    std.save()
    .then( person=>{

        res.render('success',{person});
    })
    .catch(error=>{
    res.status(500).send(error);
    })
   
    
 /*   try {
        var name=req.body.name;
        var roll =req.body .roll;
         var std=new student({
            name:name,
            roll:roll
        });
        var addstd=await std.save();
        console.log(addstd);
        res.render('success',{person});
    } catch (error) {
        console.log(error);
    } */


})
app.get('/update/:id',(req,res)=>{

    student.findById({_id:req.params.id},(error,std)=>{

        if (std) {
            res.render('update',{std});
        }

        if (error) {
            res.send(error);
        }

    }
    );
    
   
})
app.post('/update',(req,res)=>{

    var id =req.body.id;
    student.findByIdAndUpdate(id,{$set:{name:req.body.name,roll:req.body.roll}},{new:true},(doc,error)=>{
        if(error){
            res.send(error);
        }
        if (doc) {
            res.send(doc);
        }
    })
    
  
});
app.get('/delete/:id',(req,res)=>{

        student.findByIdAndDelete(req.params.id,(error,doc)=>
        {
            if (error) {
                res.send(error);
            }
            if (doc) {
                res.send('data deleted'+doc);
            }

        });
});



app.listen(8000,function(){
    console.log('server created');
});