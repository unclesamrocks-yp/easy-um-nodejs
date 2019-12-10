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

	static editItem(id, title, imgUrl, price, desc) {
		const prod = Product.getItemById(id)
		prod.title = title
		prod.imgUrl = imgUrl
		prod.price = price
		prod.desc = desc
	}

	static addItem(data) {
		products.push(data)
	}

	static deleteItem(id) {
		const index = products.findIndex(el => el.id == id)
		products.splice(index, 1)
	}
}

module.exports = Product
