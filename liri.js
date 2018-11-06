//////////////////////////////////////////////////////////////////**
//* SPOTIFY
//////////////////////////////////////////////////////////////////**
require("dotenv").config();
//process.argv

let keys = require("./keys.js")
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
console.log(keys.spotify)
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

//////////////////////////////////////////////////////////////////**
//* OMDB
//////////////////////////////////////////////////////////////////**

// request(“http://www.omdbapi.com/?t=” + userSearch + “&y=&plot=short&apikey=trilogy”, function

//////////////////////////////////////////////////////////////////**
//* Bands in Town
//////////////////////////////////////////////////////////////////**


// request(“https://rest.bandsintown.com/artists/” + userSearch + “/events?app_id=codingbootcamp”