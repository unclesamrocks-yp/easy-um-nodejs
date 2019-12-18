const mongoose = require('mongoose')

const { products } = require('./util/products')
const { mongoURI } = require('./util/mongodb')

const Product = require('./models/product')

const init = async () => {
	try {
		await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

		const prodsMap = products.map(async item => {
			const prod = new Product({
				title: item.title,
				imgUrl: item.imgUrl,
				desc: item.desc,
				price: item.price
			})
			return await prod.save()
		})

		await Promise.all(prodsMap)
		return 'UPLOAD COMPLETE!'
	} catch (error) {
		console.log(error)
	}
}

// init().then(console.log)

const uuid = require('uuid/v4')
console.log(uuid())
