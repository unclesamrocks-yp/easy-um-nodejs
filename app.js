const path = require('path')

const express = require('express')
const handlebars = require('express-handlebars')
const sassMiddleware = require('node-sass-middleware')
const bodyParser = require('body-parser')

const rootRouter = require('./routes/root')

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

app.use(rootRouter) // root router logic here

// init app
const PORT = 8080
app.listen(PORT)
console.log(`Server started on http://localhost:${PORT}`)
