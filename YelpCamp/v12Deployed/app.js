var express         = require('express'),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    flash           = require('connect-flash'),
    LocalStrategy   = require('passport-local'),
    Campground      = require('./models/campground'),
    Comment         = require('./models/comment'),
    seedDB          = require('./seeds'),
    User            = require('./models/user'),
    methodOverride  = require('method-override');

//requiring routes
var commentRoutes       = require('./routes/comments'),
    campgroundRoutes    = require('./routes/campgrounds'),
    authRoutes          = require('./routes/auth');
    
//Environment variable. Use these to hide database information or anything else that shouldn't be public info
//This version reveals the database name but is a backup for transfering the code to a new user
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v12Deployed";
mongoose.connect(url);
//This environment variable hides the database name. Google how to create environment variables for Node.
    // mongoose.connect(process.env.DATABASEURL);
//link to the mongodb lab database
//mongoose.connect("mongodb://kevin:1234@ds021663.mlab.com:21663/yelpcamps");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//This snippit below allows the public directory to be served 
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seed the database
// seedDB();

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
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started");
});