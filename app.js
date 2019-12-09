const path = require('path')

const express = require('express')
const handlebars = require('express-handlebars')
const sassMiddleware = require('node-sass-middleware')
const bodyParser = require('body-parser')

const routerShop = require('./routes/shop')
const routerAdmin = require('./routes/admin')

const app = express()

app.engine(
	'hbs',
	handlebars({
		layoutsDir: 'views/layout',
		defaultLayout: 'main',
		extname: 'hbs',
		partialsDir: 'views/includes'
	})
)
app.set('view engine', 'hbs')
app.set('views', 'views')

// sass
app.use(
	sassMiddleware({
		src: path.join(__dirname, 'public', 'sass'),
		dest: path.join(__dirname, 'public', 'css'),
		debug: false,
		outputStyle: 'compressed',
		response: false,
		error: err => console.log('[sassMiddleware][error]', err, '\n[sassMiddleware][file]', err.file, '\n[sassMiddleware][line]', err.line),
		prefix: '/css'
	})
)

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routerShop)
app.use(routerAdmin)

app.use((req, res, next) => {
	res.status(404).render('nopage')
})

app.use((err, req, res, next) => {
	res.status(500).render('nopage', {error: true})
})

// init app
const PORT = 8080
app.listen(PORT)
console.log(`Server started on http://localhost:${PORT}`)
