const { products } = require('../util/products')

class Product {
	constructor() {
		this.id = products.reduce((accumulator, curr) => {
			if (accumulator < curr.id) return curr.id
			else return accumulator
		}, 0)
	}

	getItemById(id) {
		return products.find(prod => prod.id.toString() === id)
	}

	getAllItems() {
		return products
	}

	editItem(id, title, imgUrl, price, desc) {
		const prod = Product.getItemById(id)
		prod.title = title
		prod.imgUrl = imgUrl
		prod.price = price
		prod.desc = desc
		// const prodIndex = products.findIndex(item=> item.id.toString() === id)
		// products[prodIndex] = prod
	}

	addItem(title, imgUrl, price, desc) {
		const newId = ++this.id
		const newProd = {
			id: newId,
			title: title,
			imgUrl: imgUrl,
			price: price,
			desc: desc
		}
		products.push(newProd)
		console.log(newProd)
	}

	deleteItem(id) {
		const index = products.findIndex(el => el.id == id)
		products.splice(index, 1)
	}
}

module.exports = new Product()
