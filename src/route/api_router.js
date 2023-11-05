const express = require('express');
const router = express.Router();
const apiController = require('../controller/api_controller')


// [GET] /api/Hello
router.get('/Hello', apiController.greeting)

// [GET] /api/users/:_id/logs
router.get('/users/:_id/logs', apiController.getFullExerciseLog)

// [GET] /api/users
router.get('/users', apiController.getAllUsers)




// [POST] /api/users/:_id/exercises
router.post('/users/:_id/exercises', apiController.saveExercisesToId)

// [POST] /api/users
router.post('/users', apiController.CreateNewUser)


module.exports = router;
