const express = require('express')

const router = express.Router()

const { products } = require('../util/products')

router.get('/', (req, res, next) => {
	res.status(200).render('index')
})

router.get('/catalog', (req, res, next) => {
	res.status(200).render('catalog', {
		catalogCSS: true,
		itemList: products
	})
})

module.exports = router
