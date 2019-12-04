setTimeout(() => {
	console.log('[timeout][1] called!')
}, 100)

setTimeout(() => {
	for (let i = 0; i < 1000000000; i++) {
		// do nothing
		if (i === 1000000000 - 1) {
			console.log('[timeout][2] finished!')
		}
	}
}, 100)

setTimeout(() => {
	console.log('[timeout][3] called!')
}, 100)

const promise = () => {
	return new Promise(res => res(console.log('[promise] resolved!')))
}

promise().then(done => console.log('[promise] fired then done!'))

console.log('[1] first call')

for (let i = 0; i < 1000000000; i++) {
	// do nothing
	if (i === 1000000000 - 1) {
		console.log('[loop] finished!')
	}
}
