const env = require("dotenv").config();
const request = require("request");

const api_key = process.env.GOOGLE_MAPS_API_KEY;

const url_googleMaps = `https://maps.googleapis.com/maps/api/geocode/json?key=${api_key}&address=`;

var location = (address, callback) => {
  var url = url_googleMaps+address;
  request({ url, json: true }, (error,{ body }) => {
    if(error){
      callback("Unable to contact googleapis",undefined);
    } else if(body.status=="ZERO_RESULTS"){
      callback("No results returned for your search",undefined);
    } else {
      callback(undefined,{
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng,
        address: body.results[0].formatted_address
      });
    }
  });
};

module.exports = {
  location: location
};
