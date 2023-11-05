const apiRouter = require('./api_router')
const siteRouter = require('./site_router')


function route(app) {
    app.use('/api', apiRouter)
    
    app.use('/', siteRouter)

}

module.exports = route;