const path = require('path')
const express = require('express')

const router = express.Router()

const {products} = require('./../util/products')

router.get('/', (req, res, next) => {
	res.status(200).render('index')
})

router.get('/catalog', (req, res, next) => {
	res.status(200).render('catalog', {
		itemList: products
	})
})

router.get('/:id', (req, res, next) => {
	res.status(200).render('product', {
		product: products.find(c=>c.id==req.params.id)
	})
})

module.exports = router