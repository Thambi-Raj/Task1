const express=require('express');
const app=express();
app.listen(3000);
const bodyparser=require('body-parser')
app.use(express.json())

app.use(bodyparser.urlencoded({extended:true}))
const path=require('path');
app.use(express.static(path.join(__dirname,'public')))


var connection=require('./mongodb.js');
connection.db1();
app.get('/',(req,res)=>{
    return res.sendFile(path.join(__dirname,'public','signup.html'));
})

//Signup details
const signschema=require('./Schema/signup.js');
app.post('/signupdata',async (req,res)=>{
    let data=req.body.d;
    let all=await signschema.find({});
    let name= await signschema.find({name:data.name});
    console.log(all);
    let mobile=await signschema.find({mobile:data.mobile});
    if(mobile.length!=0){
        return res.send("Mobile Number is Allready Available");
    }
    let email=await signschema.find({email:data.email});
    if(email.length!=0){
        return res.send("email is Allready Available");
    }
    
    await signschema.insertMany([data]).then(()=>{
       return res.send("True"); 
    }).catch(err=>{
        return res.send("False");
    });
})

app.post('/login',async (req,res)=>{

      let data= await signschema.findOne({$or:[{name:req.body.d.name},{email:req.body.d.name}]});
      let pass=req.body.d.pass;
      if(data.pass==pass || data.pin==pass){
        return res.send("True");
      }
      return res.send("False");
})