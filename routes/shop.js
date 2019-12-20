const path = require('path')
const express = require('express')
const { body, param, sanitizeParam } = require('express-validator')

const router = express.Router()

const controllerShop = require('../controllers/shop')

router.get('/', controllerShop.getIndex)

router.get('/catalog', controllerShop.getCatalog)

router.get(
	'/catalog/:page',
	[
		sanitizeParam('page').customSanitizer(value => {
			// parsing string
			const possibleNum = parseInt(value)
			const isNum = !isNaN(possibleNum) && possibleNum >= 1
			return isNum ? possibleNum : null
		}),
		param('page').custom(value => typeof value === 'number' || value === null)
	],
	controllerShop.getCatalog
)

router.get('/item/:id', controllerShop.getItem)

module.exports = router
