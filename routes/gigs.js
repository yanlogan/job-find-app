const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// get gig list
router.get('/', (req, res) => 
  Gig.findAll({raw: true })
    .then(gigs => {
      res.render('gigs', {
        gigs
      });
    })
    .catch(err => console.log(err))
  );

// display a form to add gig
router.get('/add', (req, res) => res.render('add'));

// add a gig
router.post('/add', (req, res) => {
  // variable names match the 'name' attributes of input fields
  let { title, technologies, description, budget, contact_email } = req.body;

  let errors = [];

  // validate fields
  if (!title) errors.push({ text: 'Please, add a gig title'});
  if (!description) errors.push({ text: 'Please, add a gig description'});
  if (!contact_email) errors.push({ text: 'Please, add a contact email'});

  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      description,
      budget,
      contact_email
    })
  } else {
    // insert into database

    if (!budget) budget = 'Not set';
    else budget = `$${budget}`;

    technologies = technologies.toLowerCase().replace(/, /g, ',');

    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(gig => res.redirect('/gigs')
      .catch(err => console.log(err)));
  }
  
})


module.exports = router;