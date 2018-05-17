var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, Welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "Fuck you",
        bat: "squeek"
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " says " + "'" + sound + "'");
});

app.get("/repeat/:greeting/:number", function(req, res){
    var greeting = req.params.greeting;
    var number = Number(req.params.number);
    var theGreeting = "";
    for(var i = 1; i < number; i++){
       theGreeting += greeting + " "; 
    }
    res.send(theGreeting);
});


app.get("*", function(req, res){
   res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});