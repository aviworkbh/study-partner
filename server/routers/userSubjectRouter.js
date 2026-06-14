const userSubjectRouter = require('express').Router();
const userSubjectController = require('../controllers/userSubjectController');

userSubjectRouter.post('/add', userSubjectController.addUserSubject);
userSubjectRouter.post('/get-users', userSubjectController.getUsers);
userSubjectRouter.get('/get-subjects' ,userSubjectController.getSubject);
userSubjectRouter.post('/remove-user-subject' ,userSubjectController.removeUserSubject);



module.exports = userSubjectRouter;
