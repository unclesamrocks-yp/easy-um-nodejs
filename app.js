const express = require('express')

const app = express()

app.use((req, res, next) => {
	res.status(350).json({
		status: 2,
		data: {
			title: 'asdsa'
		}
	})
})

app.listen(8080)
