var User                    = require('./models/user'),
    express                 = require('express'),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    bodyParser              = require('body-parser'),
    LocalStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose');
    

//Connection to MongoDB    
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(require('express-session')({
    secret: "Rusty can go fuck itself",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ======================
// ROUTES
// ======================


app.get("/", function(req, res){
   res.render('home') ;
});

app.get('/secret', isLoggedIn, function(req, res){
    res.render('secret');
});

// Auth ROUTES
//Show sign up form
app.get('/register', function(req, res){
   res.render('register');
});
//handling user sign up
app.post('/register', function(req, res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect('/secret');
            });
        }
    });
});


//LogIN Routes
//Render LOGIN form
app.get('/login', function(req, res){
    res.render("login");
});
//Login logic
//middleware
app.post('/login', passport.authenticate("local", {
    successRedirect: '/secret',
    failureRedirect: '/login'
}) ,function(req, res){
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect('/login');
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("=================");
    console.log("Server is running");
    console.log("=================");
});