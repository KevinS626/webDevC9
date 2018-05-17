var express     = require('express'),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//compile schema into variable that we can use
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
//         description: "This is a huge granite hill, lots of huge mounds out and about"
//     }, function(err, campground){
//         if(err){
//             console.log("FUCK");
//             console.log(err);
//         } else {
//             console.log("Newly Created Campground");
//             console.log(campground);
//         }
//     });

app.get("/", function(req, res){
   res.render("landing");
});

//Show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log("FUCK");
           console.log(err);
       } else {
           res.render("index", {campgrounds: allCampgrounds});
       }
    });
});

//CREATE - add new campground to db
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("FUCK");
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//Show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});
// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});
//ORDER OF THE ROUTES MATTERS MOTHER FUCKER
//RESTFUL ROUTES
//name       url         verb    description
//==============================================================================
//INDEX     /dogs        GET     Display a list of all dog - Show all of a given resource
//NEW       /dogs/new    GET     Displays form to make a new dog - Shows form to create new resource
//CREATE    /dogs        POST    Add new dog to db - post route for the creation of the resource
//SHOW      /dogs/:id    GET     Shows info about one dog - get request with an ID in the route


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started");
})