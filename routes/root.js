const express = require('express')

const rootRouter = express.Router()

const routerShop = require('./shop')
const routerAdmin = require('./admin')
const authRouter = require('./auth')

rootRouter.use(routerShop)
rootRouter.use(routerAdmin)
rootRouter.use('/auth', authRouter)

rootRouter.use((req, res, next) => {
	res.status(404).render('nopage')
})

module.exports = rootRouter
