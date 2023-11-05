const path = require('path')
class siteController {
    renderHome(req, res){
        res.sendFile(path.join(process.cwd(), 'public', 'views', 'index.html'))  
    }
}

module.exports = new siteController();