var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo_2");

var postModel = require('./models/post');
var userModel = require('./models/user');



postModel.create({
    title: "How to make a burger Part 4",
    content: "EVEN MORghgfhgfhgf MORE gfhgfhmore stuff ohghgfhsn hot things"
}, function(err, post){
    userModel.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post._id);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});


// userModel.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });


//Finf User
//Find all posts for that user
// userModel.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });