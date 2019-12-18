const date = new Date('December 17, 1995')

console.log(date)
console.log(date.getDate())
console.log(date.getMilliseconds())
console.log(
	date.toLocaleString('ru-RU', {
		hour12: false,
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		timeZone: 'Europe/Moscow'
	})
)

console.log('------')

const ms = Date.now()
console.log(ms)
console.log(new Date(ms))

console.log('------')
console.log(date instanceof Date)
console.log(typeof date)
