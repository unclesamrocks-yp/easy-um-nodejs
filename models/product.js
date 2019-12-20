const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productShema = new Schema(
	{
		title: { type: String, required: true, minlength: 5 },
		imgUrl: { type: String, required: true },
		price: { type: Number, min: 0, required: true },
		desc: { type: String, required: true },
		// Category ref
		category: [{ type: Schema.Types.ObjectId, required: true, ref: 'Category' }]
		// ['5dfd147bd46ab807a01b1871', '5dfd147bd46ab807a01b1871']
		/**
		 * find({
		 * 		category: {
		 * 			$in: [.....]
		 * 		}
		 * })
		 */
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Product', productShema)
