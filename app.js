// index.js

// web content
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// create an empty array for all the posts created
let posts = [];

// create a listening port
const port = 3000;
// load https
const https = require("https");
// load express module
const express = require("express");
// path
const { dirname } = require("path");
// load lodash 
const _ = require("lodash")
// load ejs
const ejs = require("ejs");
// create an application that uses express
const app = express();


// parse the URL-encoded body of a POST request
app.use(express.urlencoded({extended: true})); 
// give express app (server) access to local static files (css/images) 
app.use(express.static("public")); // public is name of the static folder
// view engine setup (assumes a views folder with an index.ejs file)
app.set("view engine", "ejs");


// create a GET request for the home (root) route
app.get("/", function(req, res) {
  // render the home.ejs file (webpage) passing through a js object (key-value pair) 
  res.render("home", { 
    startingContent: homeStartingContent,
    posts: posts
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


// create a GET request for the compose route
app.get("/compose", function(req, res) {
  // render the contact.ejs file (webpage) passing through a js object (key-value pair) 
  res.render("compose");    
});


// create a POST request for the compose route
app.post("/compose", function(req, res) {
  // create a post object (with two key-value pairs)
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody // values are passed over when post route is triggered
  };
  // add a post to the array of posts 
  posts.push(post);
  // redirect to home route
  res.redirect("/");
});


// create a GET request for the posts route  
// use 'express routing parameter' to access a dynamic URL 
app.get("/posts/:postParamName", function (req, res) { // "/:someParamName" syntax 
  // use lodash to store the requested parameter in lower case (ignores dashes/underscores) 
  const requestedTitle = _.lowerCase(req.params.postParamName);
  // loop through each post in the array
  posts.forEach(function(post) { // anonymous function 
    // store each title (using lodash lower case) in the array 
    const storedTitle = _.lowerCase(post.title);
    // check for a match between the title stored (array) and the requested param name
    if(storedTitle === requestedTitle) {
      // render a dynamic page (for each new post) using EJS templating
      res.render("post", {
        title: post.title, // title is defined in app.post() request func
        content: post.content // content is defined in app.post() request func
      });
    } 
 });
});


// port listening 
app.listen(port, function() {
  console.log("Server started on port 3000");
});
