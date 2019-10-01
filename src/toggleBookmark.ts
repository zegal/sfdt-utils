import {map} from 'lodash'
import updateBookmarkContent from './updateBookmarkContent'
import process from './processInlines'
import {
	isMatchingBookmark,
	isBookmarkStart,
	isBookmarkEnd,
} from './queryBookmark'

const toggleBookmark = (sfdt: any, name: string, toggleOn = true) => {
	// console.log('toggleBookmark name', name)
	// console.log('toggleBookmark mode', toggleOn ? 'on' : 'off')

	if (toggleOn) {
		// toggle field on
		const processInlines = (inlines) => {
			const newInlines: any[] = []

			let inMatchingBookmark = false

			inlines.forEach((inline) => {
				let defaultAdd = true

				if (isMatchingBookmark(inline, name)) {
					if (isBookmarkEnd(inline)) {
						inMatchingBookmark = false
					}

					if (isBookmarkStart(inline)) {
						inMatchingBookmark = true
					}
				}

				if (inMatchingBookmark) {
					// console.log('FOUND, DOING TOGGLE ON')
					if (inline.fieldType === 2) {
						defaultAdd = false
					}

					if (inline.hasFieldEnd === true) {
						defaultAdd = false
					}
				}

				if (defaultAdd) {
					newInlines.push(inline)
				}

			})

			return newInlines
		}

		process(sfdt, processInlines)
	} else {
		// toggle field off
		const processInlines = (inlines) => {
			const newInlines: any[] = []

			let inMatchingBookmark = false

			inlines.forEach((inline) => {
				if (isMatchingBookmark(inline, name)) {
					// console.log('Matched:', name)
					inMatchingBookmark = true
				}

				if (isBookmarkEnd(inline) && inMatchingBookmark) {
					newInlines.push({
						fieldType: 2,
					})
					inMatchingBookmark = false
				}

				newInlines.push(inline)

				if (isBookmarkStart(inline) && inMatchingBookmark) {
					newInlines.push({
						'hasFieldEnd': true,
					})
				}
			})

			return newInlines
		}

		process(sfdt, processInlines)
	}

	return sfdt
}

export default toggleBookmark
