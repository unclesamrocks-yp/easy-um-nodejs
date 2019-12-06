const Product = require('../models/product')

exports.getEditItem = (req, res, next) => {
	try {
		const id = req.params.id
		const product = Product.getItemById(id)
		res.status(200).render('admin/product', {
			isAdmin: true,
			product: product
		})
	} catch (error) {
		next(error)
	}
}

exports.postEditItem = (req, res, next) => {
	try {
		const { id, title, price, desc } = req.body
		Product.editItem(id, title, price, desc)
		res.redirect('/catalog')
	} catch (error) {
		next(error)
	}
}
