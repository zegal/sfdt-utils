import {map} from 'lodash'
import updateBookmarkContent from './updateBookmarkContent'
import process from './processInlines'
import {
	isMatchingBookmark,
	isBookmarkStart,
	isBookmarkEnd,
} from './queryBookmark'

const toggleBookmark = (sfdt: any, name: string, toggleOn = true) => {
	console.log('toggleBookmark name', name)
	console.log('toggleBookmark mode', toggleOn ? 'on' : 'off')

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

			inlines.forEach((inline) => {
				if (isBookmarkEnd(inline)) {
					newInlines.push({
						fieldType: 2,
					})
				}

				newInlines.push(inline)

				if (isBookmarkStart(inline)) {
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
