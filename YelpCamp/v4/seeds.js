var mongoose    = require('mongoose');
var Campground  = require('./models/campground');
var Comment     = require('./models/comment');

var data = [
    {
        name: "Tree Hall", 
        image: "https://farm6.staticflickr.com/5334/9925256586_c06d949b3e.jpg",
        description: "Blah Blahf;easjg fs;jg s;fdsjhglksahgsoigfhs agfdgagfdgf dgsgfshgdsgf"
    },
        {
        name: "Silent Hill", 
        image: "https://farm4.staticflickr.com/3211/3062207412_03acc28b80.jpg",
        description: "Blah Blahfdgfdg hgfdhfdf;easjg fs;jg s;fdsjhglksahgsoigfhs sgfshgdsgf"
    },
        {
        name: "Loud Mountian", 
        image: "https://farm1.staticflickr.com/97/216334734_12c2572fec.jpg",
        description: "Blah Blahf;easjg fs;jg gafdgfdg atrtwfgsb fdhgf s;fdsjhglksahgsoigfhs sgfshgdsgf"
    }
];

function seedDB() {
    //Remove all Campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
        console.log("Removed Campgrounds!");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //Create a comment
                    Comment.create(
                        {
                            text: "This place is great, where is the fucking wifi?",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment._id);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
        }
    });
    //Add a few campgrounds
}
module.exports = seedDB;