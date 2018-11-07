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
let input = process.argv[3];

//////////////////////////////////////////////////////////////////*
//*  ONE - Bands in Town
//////////////////////////////////////////////////////////////////*
let concertSearch = function() {
  //! Making sure that all arguments after process.argv3 are included in the band name search
    // for (i = 3; i < process.argv.length; i++) {
    //   input += process.argv[i] + "";
    //   console.log(input);
    // }

  //* The Search
  //* -------------------------------------------------------------
  request(
    "https://rest.bandsintown.com/artists/" +
      input +
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
let spotifySearch = function() {
  let spotify = new Spotify(keys.spotify);
  //console.log(keys.spotify);

  //! Making sure that all arguments after process.argv3 are included in the band name search
  //   for (i = 3; i < process.argv.length; i++) {
  //     input += process.argv[i] + " ";
  //     console.log(input);
  //   }

  //* The Search
  //* -------------------------------------------------------------
  spotify.search({ type: "track", query: input }, function(err, data) {
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
let movieSearch = function() {
  //! Making sure that all arguments after process.argv3 are included in the band name search
  //   for (i = 3; i < process.argv.length; i++) {
  //     input += process.argv[i] + " ";
  //     console.log(input);
  //   }

  //! If nothing is found, provide 'Mr Nobody'
  //   if (data === "") {
  //     whichMovie = "Mr+Nobody";
  //   } else {

  //* The Search
  //* -------------------------------------------------------------
  request(
    "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy",
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log(body);
      }

      //* Displaying all the information
      //* -------------------------------------------------------------
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
  );
};
// }
//////////////////////////////////////////////////////////////////*
//* FOUR - Do what it says
//////////////////////////////////////////////////////////////////*
let doItSearch = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    // console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    let ask = dataArr[0];
    let input = dataArr[1];

    console.log(ask + " " + input);

    if (ask === "concert-this") {
      concertSearch();
    }
    if (ask === "movie-this") {
      movieSearch();
    }
    if (ask === "spotify-this-song") {
      spotifySearch();
    }
  });
};

//////////////////////////////////////////////////////////////////*
//* FUNCTION CALLS
//////////////////////////////////////////////////////////////////*

if (ask === "concert-this") {
  concertSearch();
}
if (ask === "movie-this") {
  movieSearch();
}
if (ask === "spotify-this-song") {
  spotifySearch();
}
if (ask === "do-what-it-says") {
  doItSearch();
}