const express = require('express')

const router = express.Router()

const controllerAdmin = require('../controllers/admin')

router.get('/admin/item/:id', controllerAdmin.getItem)

router.get('/admin/editItem/:id', controllerAdmin.getEditItem)

router.post('/admin/editItem/:id', controllerAdmin.postEditItem)

router.get('/admin/catalog', controllerAdmin.adminCatalog)

router.get('/admin/new', controllerAdmin.getAddNewItem)

router.post('/admin/addItem', controllerAdmin.postAddNewItem)

router.get('/admin/delete/:id', controllerAdmin.postDeleteItem)

router.get('/admin/deleteConfirmed/:id', controllerAdmin.deleteConfirmed)

module.exports = router
