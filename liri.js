//////////////////////////////////////////////////////////////////**
//* GLOBAL
//////////////////////////////////////////////////////////////////**
require("dotenv").config();
let request = require("request");
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let moment = require("moment");
let fs = require("fs");
let ask = process.argv[2];
let input = process.argv.slice(3).join(" ");

//////////////////////////////////////////////////////////////////*
//*  ONE - Bands in Town
//////////////////////////////////////////////////////////////////*
let concertSearch = function(searchTerm) {
  //* The Search
  //* -------------------------------------------------------------
  request(
    "https://rest.bandsintown.com/artists/" +
      searchTerm +
      "/events?app_id=codingbootcamp",
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log(body);
      }

      //* Looping through all the data and pulling the correct information
      //* -------------------------------------------------------------
      for (i = 0; i < body.length; i++) {
        console.log("--------------------");
        console.log("Venue: " + JSON.parse(body)[i].venue.name);
        console.log(
          "Location: " +
            JSON.parse(body)[i].venue.country +
            ", " +
            JSON.parse(body)[i].venue.region +
            ", " +
            JSON.parse(body)[i].venue.city
        );
        console.log(
          "Date: " + moment(JSON.parse(body)[i].datetime).format("DD/MM/YYYY")
        );
        console.log("--------------------");
      }
    }
  );
};

//////////////////////////////////////////////////////////////////*
//* TWO - SPOTIFY
//////////////////////////////////////////////////////////////////*
let spotifySearch = function(searchTerm) {
  let spotify = new Spotify(keys.spotify);
  //console.log(keys.spotify);

  //* The Search
  //* -------------------------------------------------------------
  spotify.search({ type: "track", query: searchTerm }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    //* Displaying all the information
    //* -------------------------------------------------------------

    console.log("-----------------");
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Preview Link: " + data.tracks.items[0].preview_url);
    console.log("-----------------");
  });
};
//////////////////////////////////////////////////////////////////*
//* THREE - OMDB
//////////////////////////////////////////////////////////////////*
let movieSearch = function(searchTerm) {
  // //* The Search
  // //* -------------------------------------------------------------
  request(
    "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy",
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log(body);

        //     //* Displaying all the information
        //     //* -------------------------------------------------------------
        console.log("--------------------");
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log(
          "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
        );
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Lanugage: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("--------------------");
      }
    }
  );
};

//////////////////////////////////////////////////////////////////*
//* FOUR - Do what it says
//////////////////////////////////////////////////////////////////*
let doItSearch = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");
    let ask = dataArr[0];
    let input = dataArr[1];

    if (ask === "concert-this") {
      concertSearch(input);
    }
    if (ask === "movie-this") {
      movieSearch(input);
    }
    if (ask === "spotify-this-song") {
      spotifySearch(input);
    }
  });
};

//////////////////////////////////////////////////////////////////*
//* FUNCTION CALLS
//////////////////////////////////////////////////////////////////*

if (ask === "concert-this") {
  concertSearch(input);
}
if (ask === "movie-this") {
  movieSearch(input);
}
if (ask === "spotify-this-song") {
  spotifySearch(input);
}
if (ask === "do-what-it-says") {
  doItSearch(input);
}
