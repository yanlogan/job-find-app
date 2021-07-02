const express = require('express');
const exphdb = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error ' + err));


const app = express();

app.get('/', (req, res) => res.send('INDEX'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

