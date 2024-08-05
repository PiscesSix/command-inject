const express = require('express');
const app = express();
const multer = require('multer');
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// Import routers
const easyRouter = require('./routes/command-inject/easy');
const mediumRouter = require('./routes/command-inject/medium');
const hardRouter = require('./routes/command-inject/hard');
const fileUploadRouter = require('./routes/fileupload/easy');

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Use routers
app.use('/command-inject/easy', easyRouter);
app.use('/command-inject/medium', mediumRouter);
app.use('/command-inject/hard', hardRouter);
app.use('/fileupload/easy', fileUploadRouter);

// Serve the homepage
app.get('/', (req, res) => {
  res.render('home'); // Render the Pug template named 'home'
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
