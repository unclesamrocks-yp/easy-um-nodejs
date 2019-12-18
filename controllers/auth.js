const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

exports.getLogin = (req, res, next) => {
	try {
		res.status(200).render('login', {
			login: true
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
