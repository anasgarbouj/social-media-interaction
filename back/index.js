const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const clubInformationsrouter = require('./routes/clubInformations-routes');
const postsrouter = require('./routes/posts-routes');
const clubrouter = require("./routes/club-routes");
const path = require('path'); // Add this line to import the 'path' module
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Add these lines to serve static files
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/ClubInformations", clubInformationsrouter);
app.use("/posts", postsrouter);
app.use("/clubs", clubrouter);

mongoose.connect('mongodb+srv://ghayaderbali20:aKi9pTpnH0f2BMfr@cluster0.cvjhdhw.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Database connected');
    app.listen(5000, () => {
      console.log('Server started on port 5000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });