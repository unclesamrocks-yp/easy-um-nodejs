class Pagination {
	constructor(currPage = '', totalPages = '') {
		this.currPage = currPage
		this.totalPages = totalPages

		this.prepare()
	}

	prepare() {
		return [
			{
				first: true,
				active: false
			},
			{
				prev: true,
				active: false
			},
			{
				page: true,
				val: 1,
				active: true
			},
			{
				page: true,
				val: 2,
				active: true
			},
			{
				page: true,
				val: 3,
				active: true
			},
			{
				page: true,
				val: 4,
				active: true
			},
			{
				next: true,
				val: 5,
				active: true
			},
			{
				last: true,
				val: 10,
				active: true
			}
		]
	}
}

module.exports = Pagination
