import toggleBookmark from '../toggleBookmark'

import {
	getSFDT,
	getInlines,
	getFirstInlines,
	getBookmark,
} from './utils'

const inlines = getInlines()

const sfdt = getSFDT(inlines.concat(getBookmark()))

const name = 'DATA::K1'

describe('toggleBookmark', function() {
	test('Toggle off', function() {
		const result = toggleBookmark(sfdt, name, false)

		const ourInlines = getFirstInlines(result)
		console.log('result', ourInlines)

		expect(ourInlines.length).toEqual(10)

		expect(ourInlines[2].hasFieldEnd).toEqual(true)
		expect(ourInlines[4].fieldType).toEqual(2)
	})

	// test('Toggle on', function() {
	// 	const result = toggleBookmark(sfdt, name)
	// 	// const result = toggleBookmark('test', {a: 1}, 'a + 2', sfdt)

	// 	const ourInlines = getFirstInlines(result)
	// 	console.log('result', ourInlines)

	// 	expect(ourInlines.length).toEqual(5)
	// })
})
