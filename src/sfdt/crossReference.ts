import {isBlockList} from './canUseListCondition';
import {isBookmark} from './../queryBookmark';
import get from 'lodash/get';
import filter from 'lodash/filter';
import {block as BlockType} from '../../types/sfdt';
import {processSFDT, processBlockForCrossRef} from './blocksProcess';
import createSfdt from './numberFromList';

export const doInlinesContain = (inlines, callback) => {
	const newInlines = filter(inlines, (inline) => {
		return callback(inline);
	});

	return newInlines;
};

const ANCHOR = 'XREFANCHOR';
const REF = 'XREF';
const doInlinesContainAnchor = (inlines) =>
	doInlinesContain(inlines, (inline) => {
		const name = get(inline, 'name');

		const processedName = name && name.split(':');
		if (isBookmark(inline) && processedName.includes(ANCHOR)) {
			return true;
		}
	});

const doInlinesContainRef = (inlines) =>
	doInlinesContain(inlines, (inline) => {
		const name = get(inline, 'name');

		const processedName = name && name.split(':');
		if (isBookmark(inline) && processedName.includes(REF)) {
			return true;
		}
	});

export const manipulateSfdtForCrossRef = (oldSfdt, block: BlockType) => {
	const sfdt = createSfdt(oldSfdt);

	// console.log('Block-------------', block);
	const number = sfdt.getNumberFromList(block);
	console.log('Number----------', number);

	// find XREF with the same name as XREFANCHOR
};

export const findAnchor = (sfdt, callback) => {
	if (!sfdt) {
		return;
	}

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
			if (isBlockList(block)) {
				callback(sfdt, block);
			}
			// callback(sfdt, block);
		};

		return processBlockForCrossRef(block, callbackInline, callbackBlock);
	});
};
