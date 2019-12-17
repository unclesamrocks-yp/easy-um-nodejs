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
		const products = await Product.find()
		res.status(200).render('catalog', {
			itemList: products,
			catalog: true
		})
	} catch (error) {
		next(error)
	}
}

exports.getItem = async (req, res, next) => {
	try {
		const id = req.params.id
		const product = await Product.findOne({_id: id})
		if (!product) throw new Error('Product not found')
		res.status(200).render('product', {
			product: product
		})
	} catch (error) {
		next(error)
	}
}

exports.logIn = (req, res, next) => {
	try {
		res.status(200).render('login', {
			login: true
		})
	} catch (error) {
		next(error)
	}
}

exports.addUser = async (req, res, next) => {
	try {
		const validation = validationResult(req)
		if (!validation.isEmpty()) {
			const errors = validation.array().reduce((acc, curr) => {
				acc[curr.param] = true
				return acc
			}, {})
			res.status(200).render('login', {
				login: true,
				isError: true,
				user: req.body,
				isInvalid: errors
			})
		} else {
			console.log(req.body)
			const { name, password, birthdate, mail } = req.body
			const user = new User({
				name: name,
				password: password,
				birthdate: birthdate,
				mail: mail
			})
			await user.save()
			console.log('ok')
			res.redirect('/')
		}
	} catch (error) {
		next(error)
	}
}
