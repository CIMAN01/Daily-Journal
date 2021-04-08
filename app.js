// index.js

// web starting content
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


// create a listening port
const port = 3000;
// load https package
const https = require("https");
// get path
const { dirname } = require("path");
// require lodash package
const _ = require("lodash")
// load ejs
const ejs = require("ejs");
// get mongoose package
const mongoose = require("mongoose");
// require express module
const express = require("express");

// create an application that uses express
const app = express();

// view engine setup (assumes a views folder with an index.ejs file)
app.set("view engine", "ejs");

// parse the URL-encoded body of a POST request
app.use(express.urlencoded({extended: true})); 
// give express app (server) access to local static files (css/images) 
app.use(express.static("public")); // public is name of the static folder


// connect to a new database called blogDB
mongoose.connect("mongodb://localhost:27017/blogDB",  
                    {useNewUrlParser: true, useUnifiedTopology: true}); 


// create a new Schema that contains a title and content
const postSchema = {
    title: String,
    content: String
}; 

// create a new mongoose Model using the schema to define the posts collection
const Post = mongoose.model("Post", postSchema);


// create a GET request for the home route
app.get("/", function(req, res) {
  // find all the posts in the posts collection and
  Post.find({}, function(err, posts) {
    // render the content of post in the home.ejs file
    res.render("home", { 
      // pass through javascript objects (key-value pairs)
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});


// create a GET request for the compose route
app.get("/compose", function(req, res) {
  // render the contact.ejs file (webpage) passing through a js object (key-value pair) 
  res.render("compose");    
});


// create a POST request for the compose route
app.post("/compose", function(req, res) {
  // create a new post Document using your mongoose model
  const post = new Post({
    // values are passed over from compose.ejs when post method in the form is called
    title: req.body.postTitle,
    content: req.body.postBody
  });
  // save the document to database 
  post.save(function(err) { // add a call back to the mongoose save() method
    // only redirect to the home page once save is complete without errors
    if (!err){
      res.redirect("/"); // redirect to home route 
    }
  });
});


// create a GET request for the posts route   
app.get("/posts/:postId", function(req, res) { // express routing parameter
  // store the postId parameter value
  const requestedPostId = req.params.postId; 
  // find the post with a matching id in the posts collection
  Post.findOne({_id: requestedPostId}, function(err, post) {
    // once a matching post is found, you can render 
    res.render("post", {
      // its title and 
      title: post.title,
      // content in the post.ejs page
      content: post.content
    });
  });
});


// create a GET request for the about route
app.get("/about", function(req, res) {
  // render the about.ejs file (webpage) passing through a js object (key-value pair) 
  res.render("about", { 
    aboutContent: aboutContent });    
});


// create a GET request for the contact route
app.get("/contact", function(req, res) {
  // render the contact.ejs file (webpage) passing through a js object (key-value pair) 
  res.render("contact", { 
    contactContent: contactContent });    
});


// port listening 
app.listen(port, function() {
  console.log("Server started on port 3000");
});
