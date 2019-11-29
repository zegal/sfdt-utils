import toggleBookmark from '../toggleBookmark'

import list2Inlines from './fixtures/list-2'
import nestedConditionListWithParentOnOneChildOff from './fixtures/nestedConditionListWithOneChildToggleOff'
import nestedConditionWithParentOffOneChildOff from './fixtures/nestedConditonWithParentOff'

import {
	getSFDT,
	getInlines,
	getFirstInlines,
	getBookmark,
} from '../../__tests__/utils'

const inlines = getInlines()

const bookmarkType = 'COND'
const uuid = 'K1'
const name = `${bookmarkType}::${uuid}`

describe('toggleBookmark', function() {
	describe('Simple', function() {
		test('Toggle off', function() {
			const sfdt = getSFDT(inlines.concat(getBookmark(uuid, 'COND::')))
			const ourInlinesBeforeToggle = getFirstInlines(sfdt)
			expect(ourInlinesBeforeToggle.length).toEqual(8)

			const result = toggleBookmark(sfdt, name, false)

			const ourInlinesAfterToggle = getFirstInlines(result)
			// console.log('result', ourInlinesAfterToggle)

			expect(ourInlinesAfterToggle.length).toEqual(10)
			expect(ourInlinesAfterToggle[6].hasFieldEnd).toEqual(true)
			expect(ourInlinesAfterToggle[8].fieldType).toEqual(2)
		})

		test('Toggle on', function() {
			const sfdt = getSFDT(inlines.concat(getBookmark(uuid, 'COND::')))
			const toggledSfdt = toggleBookmark(sfdt, name, false)

			const initialInlines = getFirstInlines(toggledSfdt)
			expect(initialInlines.length).toEqual(10)

			const result = toggleBookmark(sfdt, name, true)

			const ourInlines = getFirstInlines(result)
			// console.log('result', ourInlines)

			expect(ourInlines.length).toEqual(8)
		})
	})

	describe('Nested', function() {
		test('Toggle parent off', function() {
			const nestedBookmarkSfdt = getSFDT(false, nestedConditionListWithParentOnOneChildOff)
			const initialInlines = getFirstInlines(nestedBookmarkSfdt)
			// console.log('initialInlines', initialInlines)

			expect(initialInlines.length).toEqual(10)

			const toggledOff = toggleBookmark(nestedBookmarkSfdt, 'COND::dafe554d-08b5-463f-a40c-cf5e260be606', false)
			const toggledOffInlines = getFirstInlines(toggledOff)
			// console.log('toggledOffInlines', toggledOffInlines)
			expect(toggledOffInlines.length).toEqual(10)

			expect(toggledOffInlines[1].hasFieldEnd).toEqual(true)
			expect(toggledOffInlines[5].hasFieldEnd).toBeUndefined()

			expect(toggledOffInlines[8].fieldType).toEqual(2)
			expect(toggledOffInlines[7].fieldType).toBeUndefined()
		})

		test('Toggle parent on', function() {
			const nestedBookmarkSfdt = getSFDT(false, nestedConditionWithParentOffOneChildOff)
			// console.log('Nested Bookmark parent off----------', JSON.stringify(nestedBookmarkSfdt, null, 2))
			const initialInlines = getFirstInlines(nestedBookmarkSfdt)
			// console.log('Parent off---------', initialInlines)

			expect(initialInlines.length).toEqual(10)
			expect(initialInlines[1].hasFieldEnd).toBeTruthy()
			expect(initialInlines[8].fieldType).toBe(2)

			const toggledOn = toggleBookmark(nestedBookmarkSfdt, 'COND::dafe554d-08b5-463f-a40c-cf5e260be606')
			const toggledOnInlines = getFirstInlines(toggledOn)
			// console.log('toggledOnInlines', toggledOnInlines)
			expect(toggledOnInlines.length).toEqual(8)
			expect(toggledOnInlines[1].hasFieldEnd).toBeUndefined()
			expect(toggledOnInlines[6].fieldType).toBeUndefined()
		})

		/** parent should only toggle off in this case */
		test('Toggle parent off along with one child off', () => {
			const nestedBookmarkSfdt = getSFDT(false, nestedConditionListWithParentOnOneChildOff)
			const initialInlines = getFirstInlines(nestedBookmarkSfdt)
			// console.log('initialInlines', initialInlines)

			expect(initialInlines.length).toEqual(10)

			const toggledOff = toggleBookmark(nestedBookmarkSfdt, 'COND::dafe554d-08b5-463f-a40c-cf5e260be606', false)
			const toggledOffChild = toggleBookmark(toggledOff, 'COND::cf6913ce-0e3b-4657-a164-88ab7c18a875')
			const toggledOffInlines = getFirstInlines(toggledOffChild)
			// console.log('toggledOffInlines', toggledOffInlines)
			expect(toggledOffInlines.length).toEqual(10)

			expect(toggledOffInlines[1].hasFieldEnd).toEqual(true)
			expect(toggledOffInlines[5].hasFieldEnd).toBeUndefined()

			expect(toggledOffInlines[8].fieldType).toEqual(2)
			expect(toggledOffInlines[7].fieldType).toBeUndefined()
		})
	})

	/**
	 * Toggling same sfdt 2 time, checking toggle object is inserted 2 times or not
	 */
	describe('Nested + Toggle off x2', function() {
		test('Toggle off x2', function() {
			const nestedBookmarkSfdt = getSFDT(false, nestedConditionListWithParentOnOneChildOff)
			const initialInlines = getFirstInlines(nestedBookmarkSfdt)
			expect(initialInlines.length).toEqual(10)

			// console.log('TOGGLE STARTING---------------------------------')
			const toggledOff = toggleBookmark(nestedBookmarkSfdt, 'COND::dafe554d-08b5-463f-a40c-cf5e260be606', false)
			const toggledOffInlines1 = getFirstInlines(toggledOff)
			expect(toggledOffInlines1.length).toEqual(10)

			// console.log('TOGGLE STARTING---------------------------------')
			const toggledOff2 = toggleBookmark(toggledOff, 'COND::dafe554d-08b5-463f-a40c-cf5e260be606', false)
			const toggledOffInlines2 = getFirstInlines(toggledOff2)
			expect(toggledOffInlines2.length).toEqual(10)
		})
	})
})


