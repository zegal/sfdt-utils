import process from './bookmarkProcess';

import SFDTType from '../../types/sfdt';

/*
 * Change the highlights of bookmark(s) contents
 *
 * @param {object} sfdt - The raw SFDT
 * @param {array} bookmarks - List of bookmark id's to change contents of
 * @param {string} highlightColor - Hex colour to change bookmark highlight to
 *
 * eg: bookmarkHighlight(sfdt, ['bookmark_id'], '#ff0000') // red
 */
export default (
	sfdt: SFDTType,
	bookmarks: string[],
	highlightColor = 'NoColor',
	characterType = 'highlightColor',
	lineProcess
) => {
	// console.log('Checking bookmarks:', bookmarks)

	const processInline = (inline) => {
		// we don't want to loose format on highlight
		// helps to reserve text format on highlight
		if (!inline.characterFormat) {
			inline.characterFormat = {};
		}
		// console.log('Smoking colour.')
		inline.characterFormat[characterType] = highlightColor;

		return inline;
	};

	const processBlock = (block) => {
		if (!block.characterFormat) {
			block.characterFormat = {};
		}

		if (block.characterFormat) {
			block.characterFormat[characterType] = highlightColor;
		}

		return block;
	};

	return process(sfdt, bookmarks, processInline, processBlock, lineProcess);
};
