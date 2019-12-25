const Product = require('../models/product')
const User = require('../models/user')

const Pagination = require('../util/helpers')

const { ITEMS_PER_PAGE } = require('../util/config').pagination

exports.getIndex = (req, res, next) => {
	try {
		res.status(200).render('index', { index: true })
	} catch (error) {
		next(error)
	}
}

exports.getCatalog = async (req, res, next) => {
	try {
		const currPage = req.params.page || 1
		const countDocs = await Product.estimatedDocumentCount()
		const pages = Math.ceil(countDocs / ITEMS_PER_PAGE)
		if (currPage !== null && currPage > pages) throw new Error('[getCatalog] Requested page is not found!')
		const products = await Product.find()
			.skip(ITEMS_PER_PAGE * (currPage - 1))
			.limit(ITEMS_PER_PAGE)
		// pagination
		const pagination = new Pagination(currPage, pages).prepare()
		// console.log(pagination)
		res.status(200).render('catalog', {
			itemList: products,
			catalog: true,
			currPage: currPage ? currPage : 1,
			pagination: pagination
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
