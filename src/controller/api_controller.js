const dbModel = require('../config/database/dbSchema')
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
        dbModel.find({}, {_id: 1, username: 1})
            .then(allUsers => res.json(allUsers))
            .catch(err => res.json(err))
    }

    // [GET] /api/users/:_id/logs
    async getFullExerciseLog(req, res){
        console.log(req.query)
        let { from, to, limit} = req.query
        if (from === undefined) from = '1000-01-01'
        if (to === undefined) to = '100000-01-01'

        let aggregate = dbModel.aggregate([
            { $match : { _id: new mongoose.Types.ObjectId(req.params._id)}},
            { $project: {
                username: 1,
                count: 1,
                log: {
                    $filter:{
                        input: '$log',
                        as: 'exercise',
                        cond: { $and:[
                            { $gte: [ "$$exercise.dateDate", new Date(from)] },
                            { $lte: [ "$$exercise.dateDate", new Date(to) ] }
                        ]},
                        limit: Number(limit) > 0 ? Number(limit) : null
                    }}
            }},
            { $project: {
                username: 1,
                count: 1,
                log: { $map :{
                    input: '$log',
                    as: 'exercise',
                    in: {
                        description: '$$exercise.description',
                        duration: '$$exercise.duration',
                        date: '$$exercise.date',
                    },
                }}
            }}
        ])
        
        aggregate.exec().then(data => res.json(data))
    }
    
/***********************************************************/
//          POST controller
    // [POST] /api/users
    CreateNewUser(req, res){
        let newUser = new dbModel(req.body)
        newUser.save()
            .then(newUserData => res.json(newUserData))
            .catch(err => res.json(err))
    }

    // [POST] /api/users/:_id/exercises
    saveExercisesToId(req, res){
        let date = req.body.date
        if (date == "") {
            let now = new Date()
            date = now.toDateString()
        } else {
            date = new Date(Date.parse(req.body.date))
            date = date.toDateString()
        }

        dbModel.findOneAndUpdate(
            { _id: req.params._id }, 
            { 
                $push: { 
                    log: { 
                        description: req.body.description,
                        duration: Number(req.body.duration),
                        date: date,
                        dateDate: date
                    }
                }, 
                $inc: { count: 1 }
            },          
            { new: true }
        )
            .then(data => {
                res.json({
                    username: data.username,
                    description: req.body.description,
                    duration: Number(req.body.duration),
                    date: date,
                    _id: data._id
                })
            })
    }
}


module.exports = new apiController();