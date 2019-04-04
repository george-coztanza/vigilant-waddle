//Load modules
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./../utils/geocode");
const weather = require("./../utils/weather");
const env = require("dotenv").config;
const port = process.env.PORT;
const private_ip = process.env.PRIVATE_IP;

const app = express();

//Define paths for express config
const viewsPath = path.join(__dirname,"../template/views");
const publicDirectoryPath = path.join(__dirname,"../public");
const partialsPath = path.join(__dirname,"../template/partials");

//Setup handlebars engine and views location
app.set("view engine","hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Generate the homepage
app.get("/",(req,res)=>{
  res.render("index",{
    title: "WEATHER",
    name: "panda"
  });
});

//Generate the About page
app.get("/about",(req,res)=>{
  res.render("about",{
    title: "ABOUT",
    name: "panda"
  });
});

//Generate the Help page
app.get("/help",(req,res)=>{
  res.render("help",{
    title: "HELP",
    message: "Help coming soon!",
    name: "panda"
  });
});

//Generate the weather page
app.get("/weather",(req,res)=>{
  if(!req.query.address){
    return res.send({
      error: "Address not provided!"
    });
  }
  geocode.location(encodeURIComponent(req.query.address), (error,geocodeData) => {
    if(error){
      return res.send({error});
    }
    weather.temperature(geocodeData.lat,geocodeData.lng, (error,weatherData) => {
      if(error){
        return res.send({error});
      }

      res.send({
          location: `${geocodeData.address}`,
          summary: `Today it will be ${weatherData.summary}. Current temperature is ${weatherData.temperature}. Forecast says ${weatherData.forecast}`
      });
    });
  });
});

//Throw error for all other pages that are fetched
app.get("*",(req,res)=>{
  res.render("404",{
    title: "404 PAGE NOT FOUND",
    name: "panda"
  });
});

//Setup express to listen on this port
app.listen(port, private_ip, () => {
  console.log(`server is up on port ${port}`);
});
