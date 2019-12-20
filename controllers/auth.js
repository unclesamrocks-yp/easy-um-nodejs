const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

exports.getLogin = (req, res, next) => {
	try {
		res.status(200).render('login', {
			isLoginPage: true
		})
	} catch (error) {
		next(error)
	}
}

exports.postLogin = async (req, res, next) => {
	try {
		const { mail, password } = req.body
		const user = await User.findOne({ email: mail }, 'email password isAdmin')
		console.log('[postLogin][user]', user)
		if (!user) throw new Error('Invalid credentials')
		// IF user -> check pass
		const isPasswordMatch = await bcrypt.compare(password, user.password)
		console.log('[pass][check]', isPasswordMatch)
		if (!isPasswordMatch) throw new Error('Invalid credentials')
		// everything OK
		req.session.isLogged = true
		req.session.userId = user._id
		if (user.isAdmin) req.session.isAdmin = user.isAdmin
		req.session.save(() => {
			res.status(200).redirect('/')
		})
	} catch (error) {
		res.status(200).render('login', {
			isLoginPage: true
		})
	}
}

exports.getRegister = (req, res, next) => {
	try {
		res.status(200).render('login', {
			isLoginPage: false
		})
	} catch (error) {
		next(error)
	}
}

exports.postAddUser = async (req, res, next) => {
	try {
		const validation = validationResult(req)
		if (!validation.isEmpty()) {
			const errors = validation.array().reduce((acc, curr) => {
				acc[curr.param] = true
				return acc
			}, {})
			console.log('[controller]')
			console.log(errors)
			res.status(200).render('login', {
				login: true,
				isError: true,
				user: req.body,
				isInvalid: errors
			})
		} else {
			const { name, password, birthdate, mail } = req.body
			const encryptedPass = await bcrypt.hash(password, 12)
			const user = new User({
				name: name,
				password: encryptedPass,
				birthdate: birthdate,
				email: mail
			})
			await user.save()
			// login user
			req.session.isLogged = true
			req.session.userId = user.id
			req.session.save(() => {
				console.log('session saved -> ok')
				res.redirect('/')
			})
		}
	} catch (error) {
		next(error)
	}
}

exports.getLogout = async (req, res, next) => {
	try {
		req.session.destroy(() => {
			res.status(200).redirect('/')
		})
	} catch (error) {
		next(error)
	}
}
