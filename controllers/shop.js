const Product = require('../models/product')

exports.getIndex = (req, res, next) => {
	try {
		res.status(200).render('index', { index: true })
	} catch (error) {
		next(error)
	}
}

exports.getCatalog = async (req, res, next) => {
	try {
		const products = await Product.find()
		res.status(200).render('catalog', {
			itemList: products,
			catalog: true
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
