const express = require('express')

const rootRouter = express.Router()

const routerShop = require('./shop')
const routerAdmin = require('./admin')

rootRouter.use(routerShop)
rootRouter.use(routerAdmin)

rootRouter.use((req, res, next) => {
	res.status(404).render('nopage')
})

rootRouter.use((err, req, res, next) => {
	res.status(500).render('nopage', { error: true })
})

module.exports = rootRouter
