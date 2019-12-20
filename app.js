const path = require('path')

const express = require('express')
const handlebars = require('express-handlebars')
const sassMiddleware = require('node-sass-middleware')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csurf = require('csurf')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const rootRouter = require('./routes/root')

const { mongoURI } = require('./util/mongodb')

const EXPIRE_TIME_FAST = 1000 * 60 * 60 * 24 // 1 day
const EXPIRE_TIME_LONG = 1000 * 60 * 60 * 24 * 7 // 1 week

const app = express()
const csrfProtection = csurf({ cookie: true })

/*==============================================
			Connect MongoDB
===============================================*/
mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		/*==============================================
			App Custom Middleware & Settings
		===============================================*/
		app.engine(
			'hbs',
			handlebars({
				layoutsDir: 'views/layout',
				defaultLayout: 'main',
				extname: 'hbs',
				partialsDir: 'views/includes',

				helpers: {
					prev: function (page) {return page - 1},
					next: function (page) {return page + 1}
				}
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
		app.use(cookieParser())
		app.use(
			session({
				secret: '123',
				saveUninitialized: false,
				cookie: { maxAge: EXPIRE_TIME_FAST },
				resave: true,
				store: new MongoStore({ mongooseConnection: mongoose.connection, collection: 'sessions' })
			})
		)
		app.use(csrfProtection)

		/*==============================================
				Global Template Vars
		===============================================*/
		app.use((req, res, next) => {
			res.locals.csrfToken = req.csrfToken() // addin csrf protection token here!
			console.log(req.session)
			// res.locals.isAdmin = ....
			// res.locals.cart = ...
			next()
		})

		app.use(rootRouter) // root router logic here

		/*==============================================
				Error Middleware
		===============================================*/
		app.use((err, req, res, next) => {
			if (err.code === 'EBADCSRFTOKEN') {
				return res.status(500).render('nopage', { error: true, message: 'Invalid CSRF Token!' })
			}
			console.log('[ErrorMiddleware]')
			console.log(err)
			res.status(500).render('nopage', { error: true })
		})

		/*==============================================
				Init App
		===============================================*/
		const startApp = async () => {
			try {
				const PORT = 8080
				app.listen(PORT)
				console.log(`Server started on http://localhost:${PORT}`)
			} catch (error) {
				console.log('[App][Error]')
				console.log(error)
				process.exit(404)
			}
		}

		startApp()
	})
	.catch(console.log)
