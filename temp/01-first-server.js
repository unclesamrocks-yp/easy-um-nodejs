const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
	console.log('[url]', req.url)
	console.log('[method]', req.method)
	const method = req.method
	const url = req.url
	if (url === '/') {
		// send data back to user
		res.write('<html>')
		res.write('<head>')
		res.write('<title>AWESOME SITE</title>')
		res.write('<head>')
		res.write('<body>')
		res.write('<h1>hello from node.js</h1>')
		res.write('<div><form action="/msg" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></div>')
		res.write('</body>')
		res.write('</html>')
		res.end()
	}
	if (url === '/msg' && method === 'POST') {
		const body = []
		// начинаем получать данные
		req.on('data', chunk => {
			console.log(chunk)
			body.push(chunk)
		})

		// закончили получать данные и теперь их можно обработать
		req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString()
			console.log('[parsedBody]', parsedBody)
			fs.writeFile('message.txt', parsedBody, () => {
				// dfsdfdsfsd
				res.write(`<h1>${parsedBody}</h1>`)
				res.end()
			})
		})
	}
})

server.listen(8080)
