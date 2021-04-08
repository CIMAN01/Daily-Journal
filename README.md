# Daily-Journal

A dynamic local website (a blog or daily journal) that allows the publisher to create new posts that get added to its homepage where other people can read them by clicking on a link next to it, which redirects to a new webpage that contains the full content of that post.

The blog was built using HTML, CSS, and Javascript for the front end, while Nodejs/Express was used for the back-end. 

The blog website/server renders pages 'dynamically' through the use of EJS templating. 

The Hyper command line was used to install necessary modules/dependencies (based on JSON package) via npm install. To run the blog app, type 'nodemon app.js' in the cli (i.e. Hyper) and by opening up a browser and typing in "localhost:3000/" in the address bar. To compose a new post, simply type "localhost:3000/compose" in the browser's address bar (a secret route only known to the user who composes new posts). 

This app/project has been updated to add data persistence by implementing mongoose (a noSQL database) locally. The purpose of using a database is to make sure the newly created posts are stored locally so that they do not disappear when the app.js is restarted or when the browser session is closed and then reopened.

![screenshot](https://user-images.githubusercontent.com/34729011/114102506-47a08180-987c-11eb-98a2-8a780538c0a5.png)


