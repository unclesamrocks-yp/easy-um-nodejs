const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userShema = new Schema(
	{
		email: { type: String, index: true, unique: true, required: true, minlength: 5, maxlength: 25 },
		password: { type: String, required: true, minlength: 5 },
		birthdate: { type: String },
		name: { type: String },
		isAdmin: { type: Boolean, default: false }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userShema)
