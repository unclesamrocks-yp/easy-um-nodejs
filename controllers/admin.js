const { validationResult } = require('express-validator')

const Product = require('../models/product')

exports.getItem = (req, res, next) => {
	try {
		const id = req.params.id
		const product = Product.getItemById(id)
		res.status(200).render('product', {
			isAdmin: true,
			product: product
		})
	} catch (error) {
		next(error)
	}
}

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
			isAdmin: true,
			admin_catalog: true
		})
	} catch (error) {
		next(error)
	}
}

exports.getAddNewItem = (req, res, next) => {
	try {
		res.status(200).render('admin/product', {
			isAdmin: true,
			add_item: true
		})
	} catch (error) {
		next(error)
	}
}

exports.postAddNewItem = (req, res, next) => {
	try {
		const validation = validationResult(req)
		if (validation.errors.length > 0) {
			// errors
			res.status(200).render('admin/product', {
				isAdmin: true,
				add_item: true,
				isError: true,
				isInvalidTitle: validation.errors.findIndex(err => err.param === 'title') === -1 ? false : true,
				isInvalidImgUrl: validation.errors.findIndex(err => err.param === 'imgUrl') === -1 ? false : true,
				isInvalidPrice: validation.errors.findIndex(err => err.param === 'price') === -1 ? false : true,
				isInvalidDesc: validation.errors.findIndex(err => err.param === 'desc') === -1 ? false : true
			})
		} else {
			// no errors
			const { title, imgUrl, price, desc } = req.body
			Product.addItem(title, imgUrl, price, desc)
			res.redirect('/catalog')
		}
	} catch (error) {
		next(error)
	}
}

exports.postDeleteItem = (req, res, next) => {
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
