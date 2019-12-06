const Product = require('../models/product')

exports.getIndex = (req, res, next) => {
	try {
		res.status(200).render('index')
	} catch (error) {
		next(error)
	}
}

exports.getCatalog = (req, res, next) => {
	try {
		const products = Product.getAllItems()
		res.status(200).render('catalog', {
			itemList: products
		})
	} catch (error) {
		next(error)
	}
}

exports.getItem = (req, res, next) => {
	try {
		const id = req.params.id
		const product = Product.getItemById(id)
		if (!product) throw new Error('Product not found')
		res.status(200).render('product', {
			product: product
		})
	} catch (error) {
		next(error)
	}
}
