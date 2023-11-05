const express = require('express');
const router = express.Router();
const siteController = require('../controller/site_controller')

// [GET] /
router.get('/', siteController.renderHome)

module.exports = router;