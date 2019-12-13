const { validationResult } = require('express-validator')

const Product = require('../models/product')

exports.getItem = (req, res, next) => {
	try {
		const id = req.params.id
		const product = Product.getItemById(id)
		if (product) {
			res.status(200).render('product', {
				isAdmin: true,
				product: product
			})
		} else next(error)
	} catch (error) {
		next(error)
	}
}

exports.getEditItem = (req, res, next) => {
	try {
		const id = req.params.id
		const product = Product.getItemById(id)
		if (product) {
			res.status(200).render('admin/product', {
				isAdmin: true,
				product: product
			})
		} else next(error)
	} catch (error) {
		next(error)
	}
}

exports.postEditItem = (req, res, next) => {
	try {
		const validation = validationResult(req)
		if (!validation.isEmpty()) {
			const errors = validation.array().reduce((acc, curr) => {
				acc[curr.param] = true
				return acc
			}, {})
			res.status(200).render('admin/product', {
				isAdmin: true,
				add_item: false,
				isError: true,
				product: req.body,
				isInvalid: errors
			})
		} else {
			const id = req.params.id
			const { title, imgUrl, price, desc } = req.body
			Product.editItem(id, title, imgUrl, price, desc)
			res.redirect('/admin/catalog')
		}
	} catch (error) {
		next(error)
	}
}

exports.adminCatalog = async (req, res, next) => {
	try {
		const products = await Product.find()
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

exports.postAddNewItem = async (req, res, next) => {
	try {
		const validation = validationResult(req)
		if (!validation.isEmpty()) {
			const errors = validation.array().reduce((acc, curr) => {
				acc[curr.param] = true
				return acc
			}, {})
			// errors
			res.status(200).render('admin/product', {
				isAdmin: true,
				add_item: true,
				isError: true,
				product: req.body,
				isInvalid: errors
			})
		} else {
			// no errors
			const { title, imgUrl, price, desc } = req.body
			const product = new Product({
				title: title,
				imgUrl: imgUrl,
				price: price,
				desc: desc
			})
			await product.save()
			res.redirect('/admin/catalog')
		}
	} catch (error) {
		next(error)
	}
}

exports.postDeleteItem = (req, res, next) => {
	try {
		const id = req.params.id
		const product = Product.getItemById(id)
		if (product) {
			res.status(200).render('admin/delete', {
				isAdmin: true,
				product: product
			})
		} else next(error)
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
