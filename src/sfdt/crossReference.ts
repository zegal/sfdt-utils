import {isBookmark, isBookmarkStart} from './../queryBookmark';
import get from 'lodash/get';
import filter from 'lodash/filter';
import {block as BlockType} from '../../types/sfdt';
import {getListFormatOfParaFormat, isValidListFormat} from './sfdtHelpers/listHelpers';

import {processSFDT, processBlock} from './blocksProcess';
import {ParseListLevel} from './sfdtHelpers/listHelpers';
import {getFullListLevelText} from './generateListNumber';
import {isNullOrUndefined} from './sfdtHelpers/utils';

const debug = false;

export const doInlinesContain = (inlines, callback) => {
	const newInlines = filter(inlines, (inline) => {
		return callback(inline);
	});

	return newInlines;
};

const ANCHOR = 'XREFANCHOR:';
const REF = 'XREF:';

const getAnchorName = (anchorBookmark) => anchorBookmark.split(ANCHOR)[1];

const inlinesWithAnchor = (inlines) =>
	doInlinesContain(inlines, (inline) => {
		const name = get(inline, 'name');
		if (isBookmarkStart(inline) && name.includes(ANCHOR)) {
			return true;
		}
		return false;
	});

const isAnchorBlock = (block) => {
	if (inlinesWithAnchor(block.inlines).length > 0) return true;
	return false;
};

const getAnchorBookmark = (block) => {
	if (isAnchorBlock(block)) {
		// Get Start inline
		const inlines = doInlinesContain(
			block.inlines,
			(inline) => get(inline, 'bookmarkType') === 0 && get(inline, 'name').includes(ANCHOR)
		);
		// Assumption one List block has one Anchor only (find the start bookmark only)
		return get(inlines[0], 'name');
	}
};

/**
 * Get updated ref list value for current list
 * @param listLevel ParseListLevel object to process the listLevel
 * @param listFormat current list block listFormat if any
 * @param block currently being processed block
 */
const getUpdatedREFData = (listLevel, listFormat, block: BlockType) => {
	if (isValidListFormat(listFormat)) {
		const listLevelsWithNumbers = listLevel.parseAllListValue(listFormat);
		const listNumberText = getFullListLevelText(listLevelsWithNumbers);
		debug && console.log('updated list values: ', listNumberText);
		// only need to return number of anchor block
		if (listNumberText && isAnchorBlock(block)) {
			const currentREFName = REF + getAnchorName(getAnchorBookmark(block));
			debug && console.log(currentREFName + '->' + listNumberText);
			return {currentREFName, listNumberText};
		}
	}
	return undefined;
};

/**
 * Returns updated ref data by processing the whole sfdt
 * @param sfdt
 */
export const getCrossRefData = (sfdt) => {
	const refData: any = {};
	if (!sfdt) {
		return;
	}
	const listLevel = new ParseListLevel(sfdt);
	// Clear render list on each process of the sfdt
	listLevel.clearLists();

	processSFDT(sfdt, (block: BlockType) => {
		const callbackBlock = (block: BlockType) => {
			const listFormat = getListFormatOfParaFormat(block, get(sfdt, 'styles'));
			const data = getUpdatedREFData(listLevel, listFormat, block);
			if (!isNullOrUndefined(data)) {
				const {currentREFName, listNumberText} = data;
				refData[currentREFName] = listNumberText;
			}
			if (get(block, 'inlines.rows')) {
				return get(block, 'inlines');
			}
			return block;
		};

		const callbackInline = (inlines) => {
			return inlines;
		};
		return processBlock(block, callbackInline, callbackBlock);
	});

	return refData;
};
