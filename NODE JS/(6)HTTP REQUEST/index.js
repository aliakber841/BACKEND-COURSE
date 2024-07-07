import express from "express"
const app=express();

app.get("/",(req,res)=>{
    res.send(`<h1>"Hello World!"</h1>`)
})

app.get("/contact",(req,res)=>{
    res.send(`<h1>Contact me</h1><p>+68892788927</p>`)
})

app.get("/about",(req,res)=>{
    res.send(`<h1>About me</h1> <p>My name is Ali</p>`)
})

app.listen(2000,()=>{
    console.log(`Server 2000 is running`);
})