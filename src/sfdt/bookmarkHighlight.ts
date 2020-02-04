import process from './bookmarkProcess';

import SFDTType from '../../types/sfdt';

const NO_COLOR = 'NoColor';

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
	highlightColor = NO_COLOR,
	characterType = 'highlightColor'
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

	const processImmediateBlockParent = (block) => {
		if (Array.isArray(block.inlines)) {
			const color = block.characterFormat?.[characterType];

			if (color !== NO_COLOR && color !== highlightColor) {
				block.characterFormat[characterType] = highlightColor;
			}
		}

		return block;
	};

	return process(sfdt, bookmarks, processInline, processBlock, processImmediateBlockParent);
};
