var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there!");
});

app.get("/bye", function(req, res){
   res.send("Bye Bye");
});

app.get("/dog", function(req, res){
    console.log("Someone made a request to /dog");
   res.send("meow"); 
});
//These two examples are route parameters
app.get("/r/:subredditName", function(req, res){
    var subReddit = req.params.subredditName;
    res.send("WELCOME TO THE " + subReddit.toUpperCase() + " SUBREDDIT!");
});
//These two examples are route parameters
app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    console.log(req.params);
    res.send("WELCOME TO A COOOOOL SUBREDDIT");
});

//Catch all ALWAYS needs to be last
app.get("*", function(req, res){
   res.send("You are a star!");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});