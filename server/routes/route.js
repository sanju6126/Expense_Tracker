const routes = require('express').Router();
const controllers = require('../controller/controller');




routes.route('/api/categories').get(controllers.create_Categories)



module.exports = routes