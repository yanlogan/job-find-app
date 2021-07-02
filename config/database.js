const { Sequelize } = require('sequelize');

module.exports = new Sequelize('job_find', 'postgres', 'Deadmaestro123', {
  host: 'localhost',
  dialect: 'postgres'
});