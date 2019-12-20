const path = require('path')
const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const controllerShop = require('../controllers/shop')

router.get('/', controllerShop.getIndex)

router.get('/catalog/:page', controllerShop.getCatalog)

router.get('/item/:id', controllerShop.getItem)

module.exports = router
