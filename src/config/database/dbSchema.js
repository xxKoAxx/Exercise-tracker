const mongoose = require('mongoose')

const exercise = new mongoose.Schema({
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String },
    dateDate: { type: Date }
}, {_id : false })

const userSchema = new mongoose.Schema({ 
    username: { type: String, required: true },
    count: { type: Number, default: 0 },
    log: [exercise]
}, {
    versionKey: false,
})



// export model (connected to Db)
module.exports = mongoose.connection.useDb('Exercise_tracker').model('users', userSchema)
