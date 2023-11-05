const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const route = require('./src/route/route_control')
const dbConnection = require('./src/config/database/dbConnection')

dbConnection.dbConnect(process.env.mongoURI)

app.use(cors())
app.use(express.static('public'))

app.use(express.urlencoded({
  extended: true
}))

route(app)


const listener = app.listen(process.env.PORT || 5000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
