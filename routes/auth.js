const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const controllerAuth = require('../controllers/auth')

// '/auth/...'
router.get('/')

router.get('/login', controllerAuth.getLogin)

router.post(
	'/addUser',
	[
		body(['name', 'password'])
			.trim()
			.isLength({ min: 5, max: 25 })
	],
	controllerAuth.postAddUser
)

module.exports = router
