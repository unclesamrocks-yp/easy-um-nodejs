const fs = require('fs')

exports.copyFile = (path, dest) => {
	return new Promise((res, rej) => {
		fs.copyFile(path, dest, err => {
			if (err) rej(err)
			else res()
		})
	})
}

exports.deleteFile = path => {
	return new Promise((res, rej) => {
		fs.unlink(path, err => {
			if (err) rej(err)
			else res()
		})
	})
}
