var express = require("express");
var app = express();

//Serves the public directory
app.use(express.static("public"));

//makes express look for ejs files so we don't have to name them home.ejs
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
})

app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
   var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "no way this is cool", author: "Same"},
        {title: "SuperNetoBro", author: "Sally"}
    ];
    
    res.render("posts.ejs", {posts: posts});
});

app.get("*", function(req, res){
    res.send("Sorry hommie no page");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
})