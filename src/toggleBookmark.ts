import {map} from 'lodash'
import updateBookmarkContent from './updateBookmarkContent'
import process from './processInlines'
import {
	isMatchingBookmark,
	isBookmarkStart,
	isBookmarkEnd,
} from './queryBookmark'

/**
* Toggle Bookmark - Hide or show the content of a bookmark
*
* @param {Object} SFDT - The SF SFDT JSON object
* @param {String} bookmarkName - Bookmark to toggle on or off
* @param {Boolean} toggleOn - True to show bookmark content, false to hide it
*
* @returns {Object} updatedSFDT
*/
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

			inlines.forEach((inline, index) => {
				const nextInline = inlines[index + 1]
				const prevInline = inlines[index - 1]

				if (isMatchingBookmark(inline, name)) {
					// console.log('Matched:', name)
					inMatchingBookmark = true
				}

				if (isBookmarkEnd(inline) && inMatchingBookmark) {
					if (prevInline && (prevInline.fieldType === undefined)) {
						// console.log('ADDING end')
						newInlines.push({
							fieldType: 2,
						})
					}

					// make sure to only add once
					// so we toggle this flag after anytime we match the end of the bookmark
					inMatchingBookmark = false
				}

				newInlines.push(inline)

				if (isBookmarkStart(inline) && inMatchingBookmark) {

					// check to see if bookmark is already off
					// and if so we dont need to add another 'off' flag
					if (nextInline && (nextInline.fieldType === undefined)) {
						// console.log('ADDING start')
						newInlines.push({
							'hasFieldEnd': true,

							// these are added automatically by SF if they are not here
							// so we add them in here manually now too so that tests can check for em
							'characterFormat': {},
							'fieldType': 0,
						})
					}

				}
			})

			return newInlines
		}

		process(sfdt, processInlines)
	}

	return sfdt
}

export default toggleBookmark
