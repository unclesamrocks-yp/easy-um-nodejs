const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const controllerAuth = require('../controllers/auth')

const User = require('../models/user')

// '/auth/...'
router.get('/')

router.get('/login', controllerAuth.getLogin)

router.post(
	'/login',
	body(['mail', 'password'])
		.trim()
		.isLength({ min: 5, max: 25 }),
	controllerAuth.postLogin
)

router.get('/register', controllerAuth.getRegister)

router.get('/logout', controllerAuth.getLogout)

router.post(
	'/register',
	[
		body(['mail', 'password'])
			.trim()
			.isLength({ min: 5, max: 25 }),
		body('mail').custom(value => {
			return User.findOne({ email: value }).then(user => {
				if (user) return Promise.reject()
				else return Promise.resolve()
			})
		})
	],
	controllerAuth.postAddUser
)

module.exports = router
