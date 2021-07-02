const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// get gig list
router.get('/', (req, res) => 
  Gig.findAll()
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
  const data = {
    title: '',
    technologies: '',
    description: '',
    budget: '',
    contact_email: '',
  };

  let { title, technologies, description, budget, contact_email } = data;
  Gig.create({
    title,
    technologies,
    description,
    budget,
    contact_email
  });
})


module.exports = router;