class TestClass {
	constructor(id, title, imgUrl, price, desc) {
		this.id = id
		this.title = title
		this.imgUrl = imgUrl
		this.price = price
		this.desc = desc
	}

	editTitle(newTitle) {
		this.title = newTitle
	}
}

const product = new TestClass(123, 'Test product', 'http', 500, 'some desc')
const product2 = new TestClass(124, 'Another', 'https', 799, 'some desc')

console.log(product)
console.log(product2)

product2.editTitle('Edited title!')

console.log('===============================')
console.log(product)
console.log(product2)
