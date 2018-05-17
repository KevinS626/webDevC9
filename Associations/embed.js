var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo");


//POST - title, content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
}, {
    usePushEach: true
});
var postModel = mongoose.model("Post", postSchema);

//USER - email, name
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   posts: [postSchema]
},  {
    usePushEach: true    
});
var userModel = mongoose.model("User", userSchema);




// var newUser = new userModel({
//     email: "fuckboy@shit.com",
//     name: "Who What"
// });
// newUser.posts.push({
//     title: "How to brew i dont know",
//     content: "just kidding hogwarts is lame"
// });
// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });



// var newPost = new postModel({
//     title: "This is fun!",
//     content: "Mice find a way to fit in tiny box eats owners hair then claws head."
// });
// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });


userModel.findOne({name: "Who What"}, function(err, user){
    if(err){
        //console.log(err);
    } else {
        user.posts.push({
            title: "3 things I like",
            content: "Leah, the sun, grass"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});

// userModel.findOne({name: "Who What"}, function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });