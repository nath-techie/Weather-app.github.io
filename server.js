const express = require('express');
const https = require('https');
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{res.sendFile(__dirname+"/index.html")});

app.post('/',(req,res)=>{
  var cityname=req.body.city;

const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&units=metric&appid=f7902bc7d0fcba89cf9a81afa97ded88";
https.get(url,(resp)=>{
  resp.on("data",(data)=>
  {
   const w=JSON.parse(data);
   const t=w.main.temp;
   const icon=w.weather[0].icon;console.log(icon);
   const des=w.weather[0].description;console.log(des);
   const iconurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
   res.setHeader("Content-Type", "text/html");
   res.write("<img src="+iconurl+">");
   res.write("<h1>In "+cityname+" Tempeature is "+t+"*Celcius</h1>");
   res.write("<h2>Weather is "+des+" </h2>");
   res.send();
  });


});
});

app.listen(3000,function(){console.log("sever wrking");});
