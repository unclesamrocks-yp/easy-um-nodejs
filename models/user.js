const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userShema = new Schema(
    {
        name: { type: String, index: true, unique: true, required: true, minlength: 5, maxlength: 25 },
        password: { type: String, required: true, minlength: 5, maxlength: 25 },
        birthdate: { type: String, required: true },
        mail: { type: String, index: true, unique: true, required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userShema)