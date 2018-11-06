//////////////////////////////////////////////////////////////////**
//* GLOBAL
//////////////////////////////////////////////////////////////////**
require("dotenv").config();
var request = require("request");
let keys = require("./keys.js")
let Spotify = require('node-spotify-api');
let moment = require('moment');
let ask = process.argv[2];
let input = process.argv[3];



//////////////////////////////////////////////////////////////////*
//*  ONE - Bands in Town
//////////////////////////////////////////////////////////////////*
if (ask === "concert-this"){
request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function(error, response, body) {

  if (!error && response.statusCode === 200) {
    // console.log(body);
  }
  console.log("--------------------");
  console.log("Venue: " + JSON.parse(body)[0].venue.name);
  console.log("Location: " + JSON.parse(body)[0].venue.country + ", " + JSON.parse(body)[0].venue.region + ", " + JSON.parse(body)[0].venue.city);
  console.log("Date: " + moment(JSON.parse(body)[0].datetime).format('DD/MM/YYYY'));
  console.log("--------------------");


});
}

//////////////////////////////////////////////////////////////////*
//* TWO - SPOTIFY
//////////////////////////////////////////////////////////////////*
if (ask === "spotify-this-song"){

let spotify = new Spotify(keys.spotify);
console.log(keys.spotify)


spotify.search({ type: 'track', query: input }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 




console.log("--------------------");
console.log("Artist: " + JSON.parse(body)[0].venue.name);
console.log("Song Name: " + input);
console.log("Preview Link: " + 12);
console.log("--------------------");
});



}
//////////////////////////////////////////////////////////////////*
//* THREE - OMDB
//////////////////////////////////////////////////////////////////*
if (ask === "movie-this"){
request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    if (!error && response.statusCode === 200) {
        // console.log(body);
      }
        console.log("--------------------");
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Lanugage: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("--------------------");
      });
      
    };
//////////////////////////////////////////////////////////////////*
//* FOUR - Do what it says
//////////////////////////////////////////////////////////////////*
