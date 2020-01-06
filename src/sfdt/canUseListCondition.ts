import {block as BlockType} from './../../types/sfdt.d';
import filter from 'lodash/filter';
import {isConditionalBookmark, isMatchingBookmark, isBookmarkStart, isBookmarkEnd} from './../queryBookmark';
import get from 'lodash/get';
import first from 'lodash/first';
import last from 'lodash/last';
import isEmpty from 'lodash/isEmpty';

const doBlockInlcude = (isIncluded) => (block, name) => {
	const inlines = get(block, 'inlines');
	const conditionalEndingBookmarks = filter(inlines, (inline) => {
		if (isIncluded(inline, name)) {
			return true;
		}
		return false;
	});

	return conditionalEndingBookmarks.length;
};

export const blockIncludeEndingConditon = doBlockInlcude((inline, name) => {
	return (
		isConditionalBookmark(inline) &&
		isMatchingBookmark(inline, name) &&
		isBookmarkEnd(inline) &&
		!conditionEndInSameLastInlines(inline, name)
	);
});

export const blockInlcudeStartCondition = doBlockInlcude((inline, name) => {
	return (
		isConditionalBookmark(inline) &&
		isMatchingBookmark(inline, name) &&
		isBookmarkStart(inline) &&
		!conditionStartInFirstInlines(inline, name)
	);
});

export const conditionStartEndInSameInlines = (block, name) => {
	const inlines = get(block, 'inlines');
	const firstElementOfInlines = first(inlines);
	const lastElementOfInlines = last(inlines);
	return (
		isMatchingBookmark(firstElementOfInlines, name) &&
		isConditionalBookmark(firstElementOfInlines) &&
		isMatchingBookmark(lastElementOfInlines, name) &&
		isConditionalBookmark(lastElementOfInlines)
	);
};

export const conditionStartInFirstInlines = (block, name) => {
	const inlines = get(block, 'inlines');
	const firstElementOfInlines = first(inlines);
	return isMatchingBookmark(firstElementOfInlines, name) && isConditionalBookmark(firstElementOfInlines);
};

export const conditionEndInSameLastInlines = (block, name) => {
	const inlines = get(block, 'inlines');
	const lastElementOfInlines = last(inlines);
	return isMatchingBookmark(lastElementOfInlines, name) && isConditionalBookmark(lastElementOfInlines);
};

function isBlank(str) {
	return !str || /^\s*$/.test(str);
}

/**
 * filter all the bookmarks from inlines that are not added by us or added by docx
 * eg. {
 * 	"characterFormat": {},
 *	"bookmarkType": 0,
 *	"name": "(c)"
 * }
 */
export const normalizeBlockInlines = (block) => {
	const inlines = get(block, 'inlines');

	const newInlines = filter(inlines, (inline) => {
		if (isConditionalBookmark(inline)) {
			return true;
		}

		// TODO:: rename isConditionalBookmark and refactor
		// this is checking data bookmark
		if (isConditionalBookmark(inline, 'DATA')) {
			return true;
		}

		const text = get(inline, 'text');
		if (text && !isBlank(text)) {
			return true;
		}

		return false;
	});

	const newBlock = {
		...block,
		inlines: newInlines
	};

	return newBlock;
};

export const isBlockList = (block: BlockType) => {
	const blockParagraphFormat = get(block, 'paragraphFormat');
	const listFormat = get(blockParagraphFormat, 'listFormat');

	if (!listFormat) {
		return false;
	}

	if (listFormat && isEmpty(listFormat)) {
		return false;
	}

	return true;
};

export function canUseListCondition(block, name) {
	// condition for numbering condition

	// 1. if block don't have paragraphFormat.listFormat
	// represent block is not list
	const blockParagraphFormat = get(block, 'paragraphFormat');
	const listFormat = get(blockParagraphFormat, 'listFormat');

	if (!listFormat) {
		return false;
	}

	if (listFormat && isEmpty(listFormat)) {
		return false;
	}

	// 2. if block.inlines first element is conditional bookmark
	// represent block may have partials condition
	// condition don't start from the beginning of the line
	if (conditionStartEndInSameInlines(block, name)) {
		return true;
	}

	// 3. if block has conditional bookmark at start but
	// last inline in same block is not ending matching conditional bookmark
	// 4. if block has conditional bookmark as end but
	// don't have same bookmark in same inlines
	return (
		(conditionStartInFirstInlines(block, name) &&
			!conditionEndInSameLastInlines(block, name) &&
			!blockIncludeEndingConditon(block, name)) ||
		(conditionEndInSameLastInlines(block, name) &&
			!conditionStartInFirstInlines(block, name) &&
			!blockInlcudeStartCondition(block, name))
	);
}
