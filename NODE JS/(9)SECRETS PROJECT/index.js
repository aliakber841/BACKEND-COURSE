//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express"
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import bodyParser from "body-parser";
const app=express();

const port=3000;
var secret=false

app.use(bodyParser.urlencoded({extended:true}));

function secretloader(req,res,next){
    const password=req.body["password"];
    if (password === 'ILoveProgramming'){
        secret=true;
        // console.log("Secret is loading...")
    }
    else{
       secret= false;
        // console.log("Secret can't be load...")
    }
    next();
}

app.use(secretloader);


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/check",(req,res)=>{
    if (secret){
        res.sendFile(__dirname + "/public/secret.html")
    }
    else{
        res.sendFile(__dirname + "/public/index.html")
    }   
})

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})