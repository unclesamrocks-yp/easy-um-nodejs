const express = require('express')
// const { body } = require('express-validator')
const { body, param, sanitizeParam } = require('express-validator')

const router = express.Router()

const controllerAdmin = require('../controllers/admin')

const { isAdmin } = require('../middleware/isAdmin')
const upload = require('../middleware/multer')

/*==============================================
				VALIDATION
===============================================*/

const validationPostItem = [
	body(['title', 'desc'])
		.trim()
		.isLength({ min: 5 }),
	body('price').isInt({ gt: 0 })
	// body('imgUrl').isURL()
]

const validationPostCategory = [
	body('title')
		.trim()
		.isLength({ min: 5 })
]

/*==============================================
				ROUTES
===============================================*/

router.get('/admin/item/:id', isAdmin, controllerAdmin.getItem)

router.get('/admin/editItem/:id', isAdmin, controllerAdmin.getEditItem)

router.post('/admin/editItem/:id', isAdmin, upload.single('file'), validationPostItem, controllerAdmin.postEditItem)

router.get('/admin/catalog', isAdmin, controllerAdmin.adminCatalog)

router.get(
	'/admin/catalog/:page',
	isAdmin,
	[
		sanitizeParam('page').customSanitizer(value => {
			// parsing string
			const possibleNum = parseInt(value)
			const isNum = !isNaN(possibleNum) && possibleNum >= 1
			return isNum ? possibleNum : null
		}),
		param('page').custom(value => typeof value === 'number' || value === null)
	],
	controllerAdmin.adminCatalog
)

router.get('/admin/new', isAdmin, controllerAdmin.getAddNewItem)

router.get('/admin/categories', isAdmin, controllerAdmin.getCategories)

router.get('/admin/add-category', isAdmin, controllerAdmin.getAddCategory)

router.get('/admin/edit-category/:id', isAdmin, controllerAdmin.getEditCategory)

router.post('/admin/addCategory', isAdmin, validationPostCategory, controllerAdmin.postAddCategory)

router.post('/admin/editCategory/:id', isAdmin, validationPostCategory, controllerAdmin.postEditCategory)

router.post('/admin/addItem', isAdmin, upload.single('file'), validationPostItem, controllerAdmin.postAddNewItem)

router.get('/admin/delete/:id', isAdmin, controllerAdmin.postDeleteItem)

router.get('/admin/deleteConfirmed/:id', isAdmin, controllerAdmin.deleteConfirmed)

// exports
module.exports = router
