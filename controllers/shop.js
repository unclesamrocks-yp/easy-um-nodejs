const { validationResult } = require('express-validator')

const Product = require('../models/product')
const User = require('../models/user')

exports.getIndex = (req, res, next) => {
	try {
		res.status(200).render('index', { index: true })
	} catch (error) {
		next(error)
	}
}

exports.getCatalog = async (req, res, next) => {
	try {
		const itemLimit = 3
		const thePage = eval(req.params.page)
		const countDocs = await Product.estimatedDocumentCount()
		const pages = Math.ceil(countDocs/itemLimit)
		if (thePage <= 0 || thePage > pages) next(error)
		const products = await Product.find().skip(itemLimit*(thePage-1)).limit(itemLimit)
		// const products = await Product.find()
		res.status(200).render('catalog', {
			itemList: products,
			catalog: true,
			thePage: thePage
		})
	} catch (error) {
		next(error)
	}
}

exports.getItem = async (req, res, next) => {
	try {
		const id = req.params.id
		const product = await Product.findOne({ _id: id })
		if (!product) throw new Error('Product not found')
		res.status(200).render('product', {
			product: product
		})
	} catch (error) {
		next(error)
	}
}
