const path = require('path')
const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const controllerShop = require('../controllers/shop')

router.get('/', controllerShop.getIndex)

router.get('/catalog', controllerShop.getCatalog)

router.get('/item/:id', controllerShop.getItem)

router.get('/login', controllerShop.logIn)

router.post('/addUser', [
    body(['name', 'password'])
        .trim()
        .isLength({ min: 5, max: 25 })
], controllerShop.addUser)

module.exports = router
