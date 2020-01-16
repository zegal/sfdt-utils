import {isBlockList} from './canUseListCondition';
import {isBookmark} from './../queryBookmark';
import get from 'lodash/get';
import filter from 'lodash/filter';
import {block as BlockType} from '../../types/sfdt';
import {processSFDT, processBlockForCrossRef, processBlocks} from './blocksProcess';
import createSfdt from './numberFromList';

export const doInlinesContain = (inlines, callback) => {
	const newInlines = filter(inlines, (inline) => {
		return callback(inline);
	});

	return newInlines;
};

const ANCHOR = 'XREFANCHOR:';
const REF = 'XREF:';

const getAnchorName = (anchorBookmark) => anchorBookmark.split(ANCHOR)[1];
const getRefName = (refBookMark) => refBookMark.split(REF)[1];

const inlinesWithAnchor = (inlines) =>
	doInlinesContain(inlines, (inline) => {
		const name = get(inline, 'name');

		const processedName = name; //&& name.split(':');
		if (isBookmark(inline) && processedName.includes(ANCHOR)) {
			return true;
		}
		return false;
	});

const inlinesWithRef = (inlines) =>
	doInlinesContain(inlines, (inline) => {
		const name = get(inline, 'name');

		const processedName = name; //&& name.split(':');
		if (isBookmark(inline) && processedName.includes(REF)) {
			return true;
		}
	});

const isAnchorBlock = (block) => {
	if (inlinesWithAnchor(block.inlines).length > 0) return true;
	return false;
};

const isRefBlock = (block) => {
	if (inlinesWithRef(block.inlines).length > 0) return true;
	return false;
};

const getAnchorListFormat = (block) => {
	if (isAnchorBlock(block)) return block.paragraphFormat.listFormat;
};

const getAnchorBookmark = (block) => {
	if (isAnchorBlock(block)) {
		// Get Start inline
		let inlines = doInlinesContain(
			block.inlines,
			(inline) => get(inline, 'bookmarkType') === 0 && get(inline, 'name').includes(ANCHOR)
		);
		// Assumption one List block has one Anchor only (find the start bookmark only)
		return get(inlines[0], 'name');
	}
};

/**
 * Finds the ref from the given anchor
 * @param listNumber the number to update the block
 * @param block the anchor block
 */
const updateRefBlockOfAnchor = (sfdt, anchorListNumber, anchorBlock: BlockType) => {
	if (!sfdt) {
		return;
	}
	// Process each block
	const anchorNameToCompare = REF + getAnchorName(getAnchorBookmark(anchorBlock));
	return processBlocks(sfdt, (block: BlockType) => {
		const callbackBlock = (block: BlockType) => {
			if (isRefBlock(block)) {
				return block;
			}
		};

		const callbackInline = (block) => {
			let inlines = block.inlines;
			// Check the inline for the bookmark as anchorbookmark
			if (anchorListNumber && isRefBlock(block)) {
				// This is same as populate function (can be refactored)
				let dataMode = false;

				// // using objects here allows for nested bookmarks
				let doneProcessing = {};
				// keep track of the current one
				let currentlyProcessing;

				const newInlines: any[] = [];

				inlines.forEach((inline) => {
					const newInline = {...inline};

					// bookmark end
					if (inline.bookmarkType === 1) {
						if (inline.name.includes(`${REF}:`) && inline.name === anchorNameToCompare) {
							dataMode = false;
						}

						currentlyProcessing = '';
						// keep end tag
						newInlines.push(newInline);
						return;
					}

					// middle of a bookmark
					// NOTE: needs to be above the start processing but below end
					// (so it does not also process the opening tag etc)
					if (dataMode) {
						if (!doneProcessing[currentlyProcessing]) {
							if (anchorListNumber !== undefined && anchorListNumber !== '') {
								newInline.text = anchorListNumber;
							}

							newInlines.push(newInline);

							doneProcessing[currentlyProcessing] = true;
						} else {
							// no else, but just a comment to make it clear
							// we are dropping this line
							// because we only use one child inside a bookmark
						}

						return;
					}

					// bookmark start
					if (inline.bookmarkType === 0) {
						if (inline.name === anchorNameToCompare) {
							dataMode = true;
						}

						currentlyProcessing = inline.name;
						// keep bookmark start tag
						newInlines.push(newInline);
						return;
					}
					// keep the normal non-inside bookmark and not bookmark start test
					newInlines.push(newInline);
				});
				return newInlines;
			}
			return inlines;
		};
		return processBlockForCrossRef(block, callbackInline, callbackBlock);
	});
};

export const manipulateSfdtForCrossRef = (sfdt, block: BlockType) => {
	if (isBlockList(block)) {
		let number = sfdt.getNumberFromList(block, isAnchorBlock);
		// Number is in the format 1.2. <= remove the point
		if (number) {
			number = number.substring(number.length - 1) === '.' ? number.substring(0, number.length - 1) : number;
			updateRefBlockOfAnchor(sfdt.sfdt, number, block);
		}
	}
	// If the num is null, then the list block has no anchor, else there is anchor and that is the num of the anchor
};

// Return updated sfdt
export const findAnchorAndUpdate = (sfdt, callback) => {
	if (!sfdt) {
		return;
	}
	const newSfdtObj = createSfdt(sfdt);
	// Clear render list on each process of the sfdt
	newSfdtObj.clearList();
	return processSFDT(sfdt, (block: BlockType) => {
		const callbackBlock = (block: BlockType) => {
			if (get(block, 'inlines.rows')) {
				return get(block, 'inlines');
			}
			return block;
		};

		const callbackInline = (block: BlockType) => {
			const inlines = get(block, 'inlines');
			callback(newSfdtObj, block);
			return inlines;
		};
		return processBlockForCrossRef(block, callbackInline, callbackBlock);
	});
};
