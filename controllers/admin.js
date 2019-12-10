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
		const { id, title, imgUrl, price, desc } = req.body
		Product.editItem(id, title, imgUrl, price, desc)
		res.redirect('/catalog')
	} catch (error) {
		next(error)
	}
}

exports.adminCatalog = (req, res, next) => {
	try {
		const products = Product.getAllItems()
		res.status(200).render('catalog', {
			itemList: products,
			admin_catalog: true
		})
	} catch (error) {
		next(error)
	}
}

exports.addNewItem = (req, res, next) => {
	try {
		res.status(200).render('admin/product', {
			isAdmin: true,
			add_item: true
		})
	} catch (error) {
		next(error)
	}
}

exports.postItem = (req, res, next) => {
	try {
		let maxId = 0
		Product.getAllItems().forEach((el) => {
			if (el.id > maxId) maxId = el.id
		})
		const id = ++maxId
		req.body.id = id
		Product.addItem(req.body)
		res.redirect('/catalog')
	} catch (error) {
		next(error)
	}
}

exports.deleteItem = (req, res, next) => {
	try {
		const id = req.params.id
		const product = Product.getItemById(id)
		res.status(200).render('admin/delete', {
			isAdmin: true,
			product: product
		})
	} catch (error) {
		next(error)
	}
}

exports.deleteConfirmed = (req, res, next) => {
	try {
		const id = req.params.id
		Product.deleteItem(id)
		res.redirect('/catalog')
	} catch (error) {
		next(error)
	}
}
