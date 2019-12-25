class Pagination {
	constructor(currPage = '', totalPages = '') {
		this.currPage = currPage
		this.totalPages = totalPages

		this.prepare()
	}

	prepare() {
		return [
			{
				arrow: true,
				page: true,
				show: this.currPage > 1,
				look: '<',
				val: this.currPage-1
			},
			{
				show: this.currPage > 2,
				page: true,
				val: 1
			},
			{
				show: this.currPage > 3,
				val: '...'
			},
			{
				show: this.currPage > 1,
				page: true,
				val: this.currPage-1
			},
			{
				show: true,
				page: true,
				active: true,
				val: this.currPage
			},
			{
				show: this.currPage < this.totalPages-1,
				page: true,
				val: this.currPage+1
			},
			{
				show: this.currPage < this.totalPages-2,
				val: '...'
			},
			{
				show: this.currPage < this.totalPages,
				page: true,
				val: this.totalPages
			},
			{
				show: this.currPage < this.totalPages-1,
				page: true,
				arrow: true,
				look: '>',
				val: this.currPage+1
			}
		]
	}
}

module.exports = Pagination
