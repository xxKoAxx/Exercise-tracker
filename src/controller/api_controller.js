const {userModel, exerciseModel} = require('../config/database/dbSchema')
const mongoose = require('mongoose')


class apiController{
/***********************************************************/
//          GET controller
    // [GET] /api/Hello
    greeting (req, res) {
        res.json({greeting: 'hello API'});
    }

    // [GET] /api/users
    getAllUsers(req, res){
        userModel.find()
            .then(allUsers => res.json(allUsers))
            .catch(err => res.json(err))
    }

    // [GET] /api/users/:_id/logs
    async getFullExerciseLog(req, res){
        const id = req.params._id;
        let { from, to, limit} = req.query
        console.log(req.query)
        // check user id exists
        const user = await userModel.findById(id);
        if (!user) return res.json({ error: "User of the given 'id' doesn't exists" });

        let dateObj = {};
        if (from) dateObj["$gte"] = new Date(from); // gte -> grater than or equals to
        if (to) dateObj["$lte"] = new Date(to); // lte -> less than or equals to

        let filter = {
            userId: id,
        }
        if (from || to) filter.date = dateObj;
        console.log(filter)
        // find exercises satisfying cond
        const exercise = await exerciseModel.find(filter, {_id: 0, userId: 0}).limit(+limit || 500);

        res.json({
            username: user.username,
            count: exercise.length,
            _id: id,
            log: exercise
        })
    }
    
/***********************************************************/
//          POST controller
    // [POST] /api/users
    async CreateNewUser(req, res){
        let newUser = new userModel(req.body)
        // newUser.omit('count', 'log')
        await newUser.save()
            .then(newUserData => res.json(newUserData))
            .catch(err => res.json(err))
    }

    // [POST] /api/users/:_id/exercises
    async saveExercisesToId(req, res){
        const id = req.body[':_id']
        let { description, duration, date } = req.body;
        date = req.body.date != null ? new Date(req.body.date) : new Date()

        if (!description) return res.json({ error: "Please provide Exercise description to proceed" });
        if (!duration) return res.json({ error: "Please provide Exercise duration to proceed" });

        // Check if "userName" already exists in User database
        const user = await userModel.findById(id);
        if (!user) return res.json({ error: "User of the given 'id' doesn't exists" });

        let newExercise = new exerciseModel({
            userId: id,
            description: description,
            duration: duration,
            date: date
        })

        await newExercise
            .save()
            .then(data =>{
                return res.json({
                    username: user.username,
                    description: data.description,
                    duration: data.duration,
                    date: date.toDateString(),
                    _id: data.userId
                })
            }).catch(err => res.json(err))
    }
}


module.exports = new apiController();