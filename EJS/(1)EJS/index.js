import express from "express"
const app=express();

const port=3000;

// const isWeekday = date => date.getDay() % 6 !== 0;
// const isWeekend = date => date.getDay() % 6 === 0;
// app.get('/',(req,res)=>{
//     if(isWeekday){
//         res.send(`<h1>Hello It's a weekday! It's time to work hard!</h1>`)
//       } else if(isWeekend){
//         res.send(`<h1>Hello It's a weekend! It's time to have fun </h1>`)
//       }
// })




app.get("/",(req,res)=>{
    const today=new Date();
    const day= today.getDay();

    let type="a weekday";
    let adv="It's time to work hard!"

    if(day=== 0 || day=== 6){
        type="a weekend";
        adv="It's time to have some fun"
    }
    res.render("index.ejs",{
        dayType:type,
        advice:adv
    });
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})



