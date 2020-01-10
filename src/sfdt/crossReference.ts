import {isBlockList} from './canUseListCondition';
import {isBookmark} from './../queryBookmark';
import get from 'lodash/get';
import filter from 'lodash/filter';
import {block as BlockType} from '../../types/sfdt';
import {processSFDT, processBlockForCrossRef, processBlocks, processBlockToUpdateRef} from './blocksProcess';
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
	// console.log(block.inlines, '^^^^^^^^^^^');
	if (inlinesWithRef(block.inlines).length > 0) return true;
	return false;
};

const getAnchorListFormat = (block) => {
	if (isAnchorBlock(block)) return block.paragraphFormat.listFormat;
};

const getAnchorBookmark = (block) => {
	if (isAnchorBlock(block)) {
		// Get Start inline
		let inlines = doInlinesContain(block.inlines, (inline) => get(inline, 'bookmarkType') === 0);
		// Assumption one List block has one Anchor only (find the start bookmark only)
		return get(inlines[0], 'name');
	}
};

// const getRefNameOfAnchor = (block, anchorName) => {
// 	if (isRefBlock(block)) {
// 		// Get Start inline
// 		let inlines = doInlinesContain(
// 			block.inlines,
// 			(inline) => get(inline, 'bookmarkType') === 0 && get(inline, 'name').includes(anchorName)
// 		);
// 		// Assumption one List block has one Anchor only (find the start bookmark only)
// 		return get(inlines[0], 'name');
// 	}
// };
// const getAnchorBlockOfRef = (block) => {
// 	const callbackBlock = (block: BlockType) => {
// 		if (get(block, 'inlines.rows')) {
// 			return get(block, 'inlines');
// 		}
// 		return block;
// 	};

// 	const callbackInline = (block: BlockType) => {
// 		// const inlines = get(block, 'inlines');

// 		// // if inlines contains anchor
// 		// // const inlineContainingAnchor = doInlinesContainAnchor(inlines);
// 		// if (isBlockList(block)) {
// 		//   callback(sfdt, block);
// 		// }
// 		return block.inlines;
// 		// callback(sfdt, block);
// 	};

// 	return processBlockForCrossRef(block, callbackInline, callbackBlock);
// };

/**
 * Finds the ref from the given anchor
 * @param listNumber the number to update the block
 * @param block the anchor block
 */
const updateRefBlockOfAnchor = (sfdt, anchorListNumber, anchorBlock: BlockType) => {
	// console.log(sfdt.sections[0].blocks[0], 'inupdateref--------------------');
	if (!sfdt) {
		return;
	}
	// Process each block
	const anchorNameToCompare = REF + getAnchorName(getAnchorBookmark(anchorBlock));
	return processBlocks(sfdt, (block: BlockType) => {
		console.log(sfdt.sections);
		const callbackBlock = (block: BlockType) => {
			// let name = getAnchorName(anchorBlock);
			// console.log('BLOCK0000', block, anchorName(name), getAnchorName(anchorBlock));
			if (isRefBlock(block)) {
				// const refBookmark = getRefName(block, anchorBookmark)
				//  if(anchorName(anchorBookmark) === refName(refName)) {
				return block;
			}
		};

		const callbackInline = (block) => {
			let inlines = block.inlines;

			// console.log('^^^^^^^^^^^^^%%%%%%%%%%%%');
			// Check the inline for the bookmark as anchorbookmark
			if (anchorListNumber && isRefBlock(block)) {
				// console.log('indsfjnskjdfnskjnfkjnsjkdf');
				let dataMode = false;

				// // using objects here allows for nested bookmarks
				// let processing = {};
				let doneProcessing = {};
				// keep track of the current one
				let currentlyProcessing;

				const newInlines: any[] = [];

				inlines.forEach((inline) => {
					const newInline = {...inline};

					// bookmark end
					if (inline.bookmarkType === 1) {
						// processing[inline.name] = false;
						// console.log('Stopping processing', inline.name, inline);
						if (inline.name.includes(`${REF}:`) && inline.name === anchorNameToCompare) {
							// console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', inline.name);
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
						// if (processing[inline.name]) {
						if (!doneProcessing[currentlyProcessing]) {
							console.log('Replacing:', newInline, anchorListNumber);
							if (anchorListNumber !== undefined && anchorListNumber !== '') {
								// console.log('Doing processing on:', newInline, {newText: data[currentlyProcessing]})
								newInline.text = anchorListNumber;

								// if (newInline.characterFormat) {
								// 	newInline.characterFormat.highlightColor = '';
								// }
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
						//inline.name === 'XREF:TermsConditions') {
						if (inline.name === anchorNameToCompare) {
							//(inline.name.includes(`${REF}:`)) {
							dataMode = true;
						}

						currentlyProcessing = inline.name;
						// console.log('Currently Processing', currentlyProcessing);

						// processing[inline.name] = true;
						// keep bookmark start tag
						newInlines.push(newInline);
						// console.log('Starting processing', inline.name, inline);
						return;
					}

					// keep the normal non-inside bookmark and not bookmark start test
					newInlines.push(newInline);
				});

				// console.log('Processing results:', {processing, doneProcessing})

				return newInlines;
			}
			return inlines;
		};
		// console.log(isRefBlock(block), block, '********************');
		return processBlockToUpdateRef(block, callbackInline, callbackBlock);

		// return processBlockForCrossRef(block, callbackInline, callbackBlock);
	});
};

export const manipulateSfdtForCrossRef = (sfdt, block: BlockType) => {
	// const sfdt = createSfdt(oldSfdt);
	// let number;
	// console.log(oldSfdt.sections[0].blocks[0], 'iiiiiiiiiiiiiiiiiiiiii');

	// console.log('Block-------------', block);

	if (isBlockList(block)) {
		let number = sfdt.getNumberFromList(block, isAnchorBlock);
		console.log('Number----------', number);
		// Number is in the format 1.2. <= remove the point
		if (number) {
			number = number.substring(number.length - 1) === '.' ? number.substring(0, number.length - 1) : number;
			// console.log('999999999', sfdt);
			updateRefBlockOfAnchor(sfdt.sfdt, number, block);
		}
	}
	// }
	// If the num is null, then the list block has no anchor, else there is anchor and that is the num of the anchor
};

// Return updated sfdt
// export const updateRefFromAnchor = (updatedSfdt, callback) => {
// 	if (!updatedSfdt) {
// 		return;
// 	}
// };
// just find the anchor here
export const findAnchor = (sfdt, callback) => {
	if (!sfdt) {
		return;
	}
	const newSfdtObj = createSfdt(sfdt);
	// Clear render list on each process of the sfdt
	newSfdtObj.clearList();
	// console.log(sfdt.sections[0].blocks[0], '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	// use processBlocks here instead of processSFDT
	return processSFDT(sfdt, (block: BlockType) => {
		const callbackBlock = (block: BlockType) => {
			if (get(block, 'inlines.rows')) {
				return get(block, 'inlines');
			}
			return block;
		};

		const callbackInline = (block: BlockType) => {
			const inlines = get(block, 'inlines');

			// if inlines contains anchor
			// const inlineContainingAnchor = doInlinesContainAnchor(inlines);
			// if (isBlockList(block)) {
			// 	callback(sfdt, block);
			// }

			callback(newSfdtObj, block);
			return inlines;
		};
		return processBlockForCrossRef(block, callbackInline, callbackBlock);
	});
};
