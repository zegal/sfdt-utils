import process from './bookmarkProcess'

/*
* Change the highlights of bookmark(s) contents
*
* @param {object} sfdt - The raw SFDT
* @param {array} bookmarks - List of bookmark id's to change contents of
* @param {string} highlightColor - Hex colour to change bookmark highlight to
*
* eg: bookmarkHighlight(sfdt, ['bookmark_id'], '#ff0000') // red
*/
export default (sfdt, bookmarks, highlightColor = '') => {
	// console.log('Checking bookmarks:', bookmarks)

	const processInline = (inline) => {
		if (inline.characterFormat && inline.characterFormat.highlightColor) {
			// console.log('Smoking colour.')
			inline.characterFormat.highlightColor = highlightColor
		} else {
			inline.characterFormat = {highlightColor}
		}

		return inline
	}

	const processBlock = (block) => {
		if (block.characterFormat) {
			block.characterFormat.highlightColor = highlightColor
		}

		return block
	}

	return process(sfdt, bookmarks, processInline, processBlock)
}
