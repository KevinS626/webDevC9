var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

//This line compiles the pervious Schema and saves it to a variable allowing us to use Cat.create()
var Cat = mongoose.model("Cat", catSchema);

// var nila = new Cat({
//     name: "Doby",
//     age: 8,
//     temperament: "kind of a dickhead"
// });

// nila.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong");
//     } else {
//         console.log("We just saved a cat to the DB!");
//         console.log(cat);
//     }
// });


Cat.create({
    name: "snowball",
    age: 15,
    temperament: "cool"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

Cat.find({}, function(err, cats){
   if(err){
       console.log("Oh fuck!");
       console.log(err);
   } else {
       console.log("All the cats!");
       console.log(cats);
   }
});