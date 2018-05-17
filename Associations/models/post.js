var mongoose = require('mongoose');

//POST - title, content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
}, {
    usePushEach: true
});

module.exports = mongoose.model("Post", postSchema);