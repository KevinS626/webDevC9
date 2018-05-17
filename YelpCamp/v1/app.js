var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
    {name: "Granite Hill", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name: "Yellow Stone", image: "https://farm3.staticflickr.com/2655/3738566424_180036be3f.jpg"},
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
    {name: "Granite Hill", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name: "Yellow Stone", image: "https://farm3.staticflickr.com/2655/3738566424_180036be3f.jpg"},
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
    {name: "Granite Hill", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name: "Yellow Stone", image: "https://farm3.staticflickr.com/2655/3738566424_180036be3f.jpg"},
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
    {name: "Granite Hill", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name: "Yellow Stone", image: "https://farm3.staticflickr.com/2655/3738566424_180036be3f.jpg"}
];

app.get("/", function(req, res){
   res.render("landing");
});




app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.post("/campgrounds", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started");
})