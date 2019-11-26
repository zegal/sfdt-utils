import processInlines from '../processInlines';

import {
	getInlines,
	getFirstInlines,
	getSFDT,
} from '../../__tests__/utils'

const sfdt = getSFDT(getInlines())

describe('processInlines component', function() {
	test('return false when no sections', () => {
		const result = processInlines({})
		expect(result).toEqual(false)
	})

	test('return true when processed stuff', () => {
		const result = processInlines(sfdt, (inlines) => {
			// console.log('inline', inline)

			inlines.forEach((inline) => {
				inline.nice = true
			})

			return inlines
		})

		expect(getFirstInlines(sfdt)[0].nice).toEqual(true)
		expect(result).toEqual(true)
	})
})
