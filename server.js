const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || '3000';
const server = http.createServer(app);
const api = require('./server/routes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/newangular', {useMongoClient: true}).then(
  () => {
    console.log('Connected to mongo server!');
    server.listen(port, () => {console.log(`API running on localhost:${port}`)});
  },
  (err) => {console.log('Something wrong!')}
);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Error handler
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).json({
    message: "Internal Server Error"
  });
});


