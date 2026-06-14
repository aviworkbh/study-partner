const filterRouter = require('express').Router()
const {filter} = require('../controllers/filterController');


filterRouter.post('/',filter);



module.exports = filterRouter;