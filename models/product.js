const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productShema = new Schema(
	{
		// Some title 1  => some-title-1
		title: { type: String, required: true, minlength: 5 },
		imgUrl: { type: String, required: true },
		price: { type: Number, min: 0, required: true },
		desc: { type: String, required: true }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Product', productShema)
