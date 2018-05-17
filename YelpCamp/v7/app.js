var express         = require('express'),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    Campground      = require('./models/campground'),
    Comment         = require('./models/comment'),
    seedDB          = require('./seeds'),
    User            = require('./models/user');

//requiring routes
var commentRoutes       = require('./routes/comments'),
    campgroundRoutes    = require('./routes/campgrounds'),
    authRoutes          = require('./routes/auth');
    

mongoose.connect("mongodb://localhost/yelp_camp_v7");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//This snippit below allows the public directory to be served 
app.use(express.static(__dirname + "/public"));
seedDB();

// Passport Config
app.use(require('express-session')({
    secret: "go fuck yourself",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//app.use will fire on every single route. Next allows the function to move onto the next element. 
//Without next() the function would stop after the first route.
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started");
})