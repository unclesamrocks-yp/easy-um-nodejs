const express = require('express')

const router = express.Router()

const controllerAdmin = require('../controllers/admin')

router.get('/admin/item/:id', controllerAdmin.getEditItem)

router.post('/admin/editItem/:id', controllerAdmin.postEditItem)

module.exports = router
