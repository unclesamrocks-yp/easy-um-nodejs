const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const controllerAdmin = require('../controllers/admin')

const { isAdmin } = require('../middleware/isAdmin')

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

router.get('/admin/item/:id', isAdmin, controllerAdmin.getItem)

router.get('/admin/editItem/:id', isAdmin, controllerAdmin.getEditItem)

router.post('/admin/editItem/:id', isAdmin, validationPostItem, controllerAdmin.postEditItem)

router.get('/admin/catalog', isAdmin, controllerAdmin.adminCatalog)

router.get('/admin/catalog/:page', isAdmin, controllerAdmin.adminCatalog)

router.get('/admin/new', isAdmin, controllerAdmin.getAddNewItem)

router.post('/admin/addItem', isAdmin, validationPostItem, controllerAdmin.postAddNewItem)

router.get('/admin/delete/:id', isAdmin, controllerAdmin.postDeleteItem)

router.get('/admin/deleteConfirmed/:id', isAdmin, controllerAdmin.deleteConfirmed)

// exports
module.exports = router
