const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const controllerAdmin = require('../controllers/admin')

router.get('/admin/item/:id', controllerAdmin.getItem)

router.get('/admin/editItem/:id', controllerAdmin.getEditItem)

router.post('/admin/editItem/:id',
	[
		body(['title', 'desc'])
			.trim()
			.isLength({ min: 5 }),
		body('price').isInt({ gt: 0 }),
		body('imgUrl').isURL()
	],
	controllerAdmin.postEditItem)

router.get('/admin/catalog', controllerAdmin.adminCatalog)

router.get('/admin/new', controllerAdmin.getAddNewItem)

router.post(
	'/admin/addItem',
	[
		body(['title', 'desc'])
			.trim()
			.isLength({ min: 5 }),
		body('price').isInt({ gt: 0 }),
		body('imgUrl').isURL()
	],
	controllerAdmin.postAddNewItem
)

router.get('/admin/delete/:id', controllerAdmin.postDeleteItem)

router.get('/admin/deleteConfirmed/:id', controllerAdmin.deleteConfirmed)

module.exports = router
