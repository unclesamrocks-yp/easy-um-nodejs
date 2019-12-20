const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categoryShema = new Schema(
	{
		title: { type: String, required: true, minlength: 5 }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Category', categoryShema)
