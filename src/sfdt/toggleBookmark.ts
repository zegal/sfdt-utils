import {isConditionalBookmark} from './../queryBookmark';
// DEPRECATED, use sfdt/blocksProcess
import filter from 'lodash/filter';
import process from './processInlines';
import {
	canUseListCondition,
	conditionStartInFirstInlines,
	conditionEndInSameLastInlines,
	conditionStartEndInSameInlines
} from './canUseListCondition';
import {isMatchingBookmark, isBookmarkStart, isBookmarkEnd, isToggleEnd, isToggleStart} from '../queryBookmark';
import {normalizeBlockInlines} from './canUseListCondition';
import Stack from '../stack';

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
			const newInlines: any[] = [];

			inlines.forEach((inline, index) => {
				let defaultAdd = true;
				const nextInline = inlines[index + 1];
				const prevInline = inlines[index - 1];

				// console.log("FOUND, DOING TOGGLE ON");
				// don't add in newInlines if inline is toggleEnd inline object
				// and nextInline is matching bookmark
				// i.e fieldType is 2 or hasFieldEnd is true
				if (isToggleEnd(inline) && isMatchingBookmark(nextInline, name)) {
					defaultAdd = false;
				}

				if (isToggleStart(inline) && isMatchingBookmark(prevInline, name)) {
					defaultAdd = false;
				}

				if (defaultAdd) {
					newInlines.push(inline);
				}
			});

			return newInlines;
		};

		process(sfdt, processInlines);
	} else {
		const stack = new Stack();
		let isStackContainInline = false;

		// boolean field for stackForInline.isEmpty() to get the inlines within the bookmark condtion
		let isInlineWithinBookmark: boolean = false;

		// toggle field off
		const processInlines = (inlines) => {
			const newInlines = filter(inlines, (inline) => {
				// console.log('Inline------------', inline);
				if (isMatchingBookmark(inline, name) && isConditionalBookmark(inline)) {
					if (isBookmarkStart(inline)) {
						stack.push(inline);
						isStackContainInline = true;

						return false;
					}

					if (isBookmarkEnd(inline)) {
						stack.pop();
						isStackContainInline = false;
						return false;
					}
				}
				// if stack is not empty; there are inlines within the condition
				isInlineWithinBookmark = !stackForInline.isEmpty();

				if (!stack.isEmpty()) {
					return false;
				}

				return true;
			});

			// empty inlines [] are not checked by filter, so use the boolean isInlineWithinBookmark to check if those inlines are to be removed or not
			if (isInlineWithinBookmark && inlines.length === 0) {
				return null;
			}
			return newInlines;
		};

		const processListBlock = (block) => {
			const normalizedBlock = normalizeBlockInlines(block);
			if (canUseListCondition(normalizedBlock, name)) {
				if (conditionStartEndInSameInlines(normalizedBlock, name)) {
					return false;
				}

				if (conditionStartInFirstInlines(normalizedBlock, name)) {
					stack.push(block);

					return false;
				}

				if (conditionEndInSameLastInlines(normalizedBlock, name)) {
					stack.pop();

					return false;
				}

				if (!stack.isEmpty()) {
					return false;
				}

				return true;
			}

			if (!stack.isEmpty()) {
				if (isStackContainInline) {
					processInlines(block.inlines);
				}
				return false;
			}

			return true;
		};

		process(sfdt, processInlines, processListBlock);
	}

	return sfdt;
};

export default toggleBookmark;
