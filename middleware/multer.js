const multer = require('multer')
const uuidv4 = require('uuid/v4')

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, 'temp'),
	filename: (req, file, cb) => cb(null, `${uuidv4()}.${file.originalname.split('.').pop()}`)
})

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/svg+xml') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

module.exports = upload
