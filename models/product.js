const { products } = require('../util/products')

class Product {
	constructor(id, title, imgUrl, price, desc) {
		this.id = id
		this.title = title
		this.imgUrl = imgUrl
		this.price = price
		this.desc = desc
	}

	static getItemById(id) {
		return products.find(prod => prod.id.toString() === id)
	}

	static getAllItems() {
		return products
	}
}

module.exports = Product
