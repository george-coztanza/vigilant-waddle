const env = require("dotenv").config();
const request = require("request");

const api_key = process.env.DARK_SKY_API_KEY;

const url_darksky = `https://api.darksky.net/forecast/${api_key}/`;

var temperature = (lat,lng,callback) => {
  var url = url_darksky+lat+","+lng+"?units=si";
  request({ url, json:true }, (error,{ body }) => {
    if(error){
      callback("Unable to contact weather service",undefined);
    } else if(body.code==400){
      callback("No results returned for your search",undefined);
    } else {
      callback(undefined,{
        summary: body.currently.summary,
        temperature: body.currently.temperature,
        forecast: body.daily.summary
      });
    }
  });
};

module.exports = {
  temperature
};
