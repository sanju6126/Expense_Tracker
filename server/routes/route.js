const routes = require('express').Router();
const controllers = require('../controller/controller');




routes.route('/api/categories').post(controllers.create_Categories)
routes.route('/api/categories').get(controllers.get_Categories)

routes.route('/api/transaction').post(controllers.create_Transaction)
routes.route('/api/transaction').get(controllers.get_Transaction)
routes.route('/api/transaction').delete(controllers.delete_Transaction)


routes.route('/api/labels').get(controllers.get_Labels)





module.exports = routes