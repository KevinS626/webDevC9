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
    

mongoose.connect("mongodb://localhost/yelp_camp_v6");
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
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
    res.render("campgrounds/new");
});
// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// ==========================
// COMMENTS ROUTEs
// ==========================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// ===========
//Auth Routes
//============
//Show Register Form
app.get('/register', function(req, res){
    res.render('register');
});
// handle sign up logic
app.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
        });
    });
});

//show login form
app.get('/login', function(req, res){
    res.render("login");
});

//handling login logic
app.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function(req, res){
});

//add logout route
app.get('/logout', function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started");
})