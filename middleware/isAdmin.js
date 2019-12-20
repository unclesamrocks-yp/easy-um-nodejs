const User = require('../models/user')

exports.isAdmin = async (req, res, next) => {
	try {
		const userId = req.session.userId
		if (!userId) throw new Error('Not found')
		const user = await User.findById(userId, 'isAdmin')
		if (!user) throw new Error('Not found')
		if (!user.isAdmin) throw new Error('Not found')
		next()
	} catch (error) {
		next(error)
	}
}
