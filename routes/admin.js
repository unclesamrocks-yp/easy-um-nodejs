const express = require('express')

const router = express.Router()

const controllerAdmin = require('../controllers/admin')

router.get('/admin/item/:id', controllerAdmin.getEditItem)

router.post('/admin/editItem/:id', controllerAdmin.postEditItem)

router.get('/admin/new', controllerAdmin.addNewItem)

router.post('/admin/addItem', controllerAdmin.postItem)

router.get('/admin/delete/:id', controllerAdmin.deleteItem)

router.get('/admin/deleteConfirmed/:id', controllerAdmin.deleteConfirmed)

module.exports = router
