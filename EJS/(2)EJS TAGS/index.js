import express from "express"
const app=express();

const port=3000;

app.get("/",(req,res)=>{
    const data={
        title:"EJS TAGS",
        seconds:new Date().getSeconds(),
        items:['Apple','Mango','Orange'],
        htmlContent:"<em>This is some an em tag</em>"
    }
    res.render("index.ejs",data)
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})