import {
	without,
	intersection,
	// get,
} from 'lodash'

import SFDTType, {block as BlockType} from '../../types/sfdt'

import {processSFDT, processBlock} from './blocksProcess'
import {isBookmarkStart, isBookmarkEnd} from '../queryBookmark'

const debug = false

/**
* Do something to the content of a list of bookmarks
*
* @param {object} sfdt - The raw SFDT
* @param {array} bookmarks - List of bookmark id's to change contents of
* @param {func} action - Action to perform
*
*/
export default function bookmarkProcess(
	sfdt: SFDTType,
	bookmarks: string[],
	doInlineMatchingAction: (block: BlockType) => void,
	doBlockMatchingAction: (block: BlockType) => void
) {
	let currentlyInsideBookmarks = [] // at top, so we can process bookmarks that span blocks

	if (!sfdt) {
		return
	}

	return processSFDT(sfdt, (block: BlockType) => {
		const callbackBlock = (block: BlockType) => {
			// console.log('Checking block:', block)
			if (intersection(bookmarks, currentlyInsideBookmarks).length > 0) {
				// console.log('Inside!', {highlightColor: get(block, 'characterFormat.highlightColor')}, {intersection: intersection(bookmarks, currentlyInsideBookmarks)})
				return doBlockMatchingAction(block)
			}

			return block
		}

		const callbackInline = (inlines) => {
			// const newInlines: any[] = []
			inlines.forEach((inline) => {
				inline = processBlock(inline, callbackInline, callbackBlock)

				if (isBookmarkStart(inline)) {
					debug && console.log('Going in:', inline.name)
					currentlyInsideBookmarks.push(inline.name)
				}

				if (isBookmarkEnd(inline)) {
					debug && console.log('Going out:', inline.name)
					currentlyInsideBookmarks = without(currentlyInsideBookmarks, inline.name)
				}

				if (intersection(bookmarks, currentlyInsideBookmarks).length > 0) {
					// console.log('Inside!', {highlightColor: get(block, 'characterFormat.highlightColor')}, {intersection: intersection(bookmarks, currentlyInsideBookmarks)})

					// @TODO: change from a mutation
					doInlineMatchingAction(inline)
				}
			})

			return inlines
		}

		return processBlock(block, callbackInline, callbackBlock)
	})
}
