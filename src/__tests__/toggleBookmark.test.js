import toggleBookmark from '../toggleBookmark'

import {
	getSFDT,
	getInlines,
	getFirstInlines,
} from './utils'

const sfdt = getSFDT(getInlines())

const name = 'DATA::K1'

describe('toggleBookmark', function() {
	test('Toggle off', function() {
		const result = toggleBookmark(sfdt, name, false)

		const ourInlines = getFirstInlines(result)
		console.log('result', ourInlines)

		expect(ourInlines.length).toEqual(7)
	})

	test('Toggle on', function() {
		const result = toggleBookmark(sfdt, name)
		// const result = toggleBookmark('test', {a: 1}, 'a + 2', sfdt)

		const ourInlines = getFirstInlines(result)
		console.log('result', ourInlines)

		expect(ourInlines.length).toEqual(5)
	})
})
