const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date },
}, { versionKey: false })

const userSchema = new mongoose.Schema({ 
    username: { type: String, required: true },
}, {
    versionKey: false,
    strict: true
})



// export model (connected to Db)
module.exports = {
    userModel : mongoose.connection.useDb('Exercise_tracker').model('users', userSchema),
    exerciseModel: mongoose.connection.useDb('Exercise_tracker').model('exercises', exerciseSchema)
}
