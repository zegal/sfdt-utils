import toggleBookmark from '../toggleBookmark'

import list2Inlines from './fixtures/list-2'

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
	describe('Simple', function() {
		test('Toggle off', function() {
			// console.log('sfdt', sfdt)
			const result = toggleBookmark(sfdt, name, false)

			const ourInlines = getFirstInlines(result)
			// console.log('result', ourInlines)

			expect(ourInlines.length).toEqual(10)

			expect(ourInlines[2].hasFieldEnd).toEqual(true)
			expect(ourInlines[4].fieldType).toEqual(2)
		})

		test('Toggle on', function() {
			const initialInlines = getFirstInlines(sfdt)
			expect(initialInlines.length).toEqual(10)
			const result = toggleBookmark(sfdt, name)

			const ourInlines = getFirstInlines(result)
			// console.log('result', ourInlines)

			expect(ourInlines.length).toEqual(8)
		})
	})

	describe('Nested', function() {
		const nestedBookmarkSfdt = getSFDT(false, list2Inlines)

		test('Toggle off', function() {
			const initialInlines = getFirstInlines(nestedBookmarkSfdt)
			// console.log('initialInlines', initialInlines)

			expect(initialInlines.length).toEqual(12)

			const toggledOff = toggleBookmark(nestedBookmarkSfdt, 'DATA::hide', false)
			const toggledOffInlines = getFirstInlines(toggledOff)
			// console.log('toggledOffInlines', toggledOffInlines)
			expect(toggledOffInlines.length).toEqual(14)
			expect(toggledOffInlines[3].hasFieldEnd).toEqual(true)
			expect(toggledOffInlines[9].fieldType).toEqual(2)
		})

		test('Toggle on', function() {
			const initialInlines = getFirstInlines(nestedBookmarkSfdt)
			expect(initialInlines.length).toEqual(14)

			const toggledOn = toggleBookmark(nestedBookmarkSfdt, 'DATA::hide')
			const toggledOnInlines = getFirstInlines(toggledOn)
			// console.log('toggledOnInlines', toggledOnInlines)
			expect(toggledOnInlines.length).toEqual(12)
		})
	})

	describe('Nested + Toggle off x2', function() {
		const nestedBookmarkSfdt = getSFDT(false, list2Inlines)

		test('Toggle off x2', function() {
			const initialInlines = getFirstInlines(nestedBookmarkSfdt)
			expect(initialInlines.length).toEqual(12)

			// console.log('TOGGLE STARTING---------------------------------')
			const toggledOff = toggleBookmark(nestedBookmarkSfdt, 'DATA::hide', false)
			const toggledOffInlines1 = getFirstInlines(toggledOff)
			expect(toggledOffInlines1.length).toEqual(14)

			// console.log('TOGGLE STARTING---------------------------------')
			const toggledOff2 = toggleBookmark(nestedBookmarkSfdt, 'DATA::hide', false)
			const toggledOffInlines2 = getFirstInlines(toggledOff2)
			expect(toggledOffInlines2.length).toEqual(14)
		})
	})

})
