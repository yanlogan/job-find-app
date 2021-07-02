const express = require('express');
const exphdb = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error ' + err));


const app = express();

app.engine('handlebars', exphdb({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing'}));

// Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

