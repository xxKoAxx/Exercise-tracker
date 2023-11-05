const mongoose = require('mongoose')

async function dbConnect(URI){
    try {
        await mongoose.connect(URI);
        console.log('successfully connect to database!!')
    }
    catch(error) {
        console.log('Connect failure!!')
        console.log(error)
    }
}

module.exports = { dbConnect }