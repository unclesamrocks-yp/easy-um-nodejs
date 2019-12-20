const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const controllerAdmin = require('../controllers/admin')

/*==============================================
				VALIDATION
===============================================*/

const validationPostItem = [
	body(['title', 'desc'])
		.trim()
		.isLength({ min: 5 }),
	body('price').isInt({ gt: 0 }),
	body('imgUrl').isURL()
]

/*==============================================
				ROUTES
===============================================*/

router.get('/admin/item/:id', controllerAdmin.getItem)

router.get('/admin/editItem/:id', controllerAdmin.getEditItem)

router.post('/admin/editItem/:id', validationPostItem, controllerAdmin.postEditItem)

router.get('/admin/catalog/:page', controllerAdmin.adminCatalog)

router.get('/admin/new', controllerAdmin.getAddNewItem)

router.post('/admin/addItem', validationPostItem, controllerAdmin.postAddNewItem)

router.get('/admin/delete/:id', controllerAdmin.postDeleteItem)

router.get('/admin/deleteConfirmed/:id', controllerAdmin.deleteConfirmed)

// exports
module.exports = router
