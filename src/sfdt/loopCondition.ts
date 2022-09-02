import get from 'lodash/get';
import {isNullOrUndefined} from './sfdtHelpers/utils';

import {block as BlockType} from '../../types/sfdt';

// const debug = true;

// populate DATA in loop duplication
// Example:
// Bookmark: entity.name, entity.pk
// assumption: the data being sent includes loop bookmark in proper dot object notation. Eg. for data {parent:{child1:{child2:{data:[array]}}}}, the loop bookmark is parent.child1.child2.data i.e perfect key with array value from given object
// const data  = normalized data in form of object

/**
 * @param data looping array datas from client (to loop). Sent as obj: array of objects
 */

// for any entity based name, make sure the prefix is entity; eg. entity.name, entity.passport etc.

const LOOP_PREFIX = 'LOOP::';
const DATA_PREFIX = 'DATA::';
const LOOP_FIELD = 'LOOP';

const loopBkInInline = (i) => i.name && i.name.includes(LOOP_PREFIX);

const loopBkInBlock = (block: any, flag = 0) => {
	if (block.bookmarkType === flag) return block.name;
	let bk;
	block.inlines &&
		block.inlines.length &&
		block.inlines.forEach((i) => {
			if (loopBkInInline(i) && i.bookmarkType === flag) bk = i.name;
		});
	return bk;
};

// For inline DATA fields. populate sfdt bookmark correctly; and then populate function will be used to correctly populate info
const populateEntityData = (inline, index, key) => {
	if (!isNullOrUndefined(inline.bookmarkType) && inline.name.includes(DATA_PREFIX)) {
		// check if it is entity or not
		// make entity object into dot object to calculate it => entity[0].name
		inline.name = inline.name.replace(LOOP_FIELD, `${key}[${index}]`);
	}
	return inline;
};
const processInline = (inlines = [], index, key) => {
	// also remove loop inline if with text but if only 1 inline - loop inline, that is also line break so not to remove it
	let isLoopBk = false;
	inlines = inlines.filter(function(inline, i) {
		populateEntityData(inline, index, key);
		if (loopBkInInline(inline)) {
			isLoopBk = true;
			return false;
		}
		return true;
	});
	return {inlines, isLoopBk};
};

const processBlock = (block: BlockType, index, key) => {
	const temp = JSON.parse(JSON.stringify(block));
	// note that if block has only 1 inline with loop bookmark, then we need to remove the block- as in processInline, we remove loop inline, and since there is only loop bk, inline will return [] which will give line break in sfdt
	// apparently if we need specific line break then we need to do it. Such case is when listCondition is given with -1 itself, or when the inline is only loop bookmark
	const {inlines, isLoopBk} = processInline(temp.inlines, index, key);
	if (isLoopBk && !inlines) {
		const blockParagraphFormat = get(block, 'paragraphFormat');
		const listFormat = get(blockParagraphFormat, 'listFormat');
		if (listFormat && listFormat.listId < 0) {
		} else {
			return;
		}
	}

	return {...block, inlines};
};
// For now loop depends on block
export default (sfdt, data = {}) => {
	if (!sfdt) {
		return;
	}
	sfdt.sections.forEach((section) => {
		let loopBlocks = [];
		const newBlocks = [];
		let dataMode = false;
		const processing = {};
		const doneProcessing = {};
		let currentlyProcessing;
		section.blocks &&
			section.blocks.length &&
			section.blocks.forEach((block, i) => {
				const loopBlock = {...block};

				// containes loop bookmark start
				const start = loopBkInBlock(block, 0);
				const end = loopBkInBlock(block, 1);
				if (end) {
					processing[end] = false;
					dataMode = false;
					if (currentlyProcessing !== end) loopBlocks = [];
					currentlyProcessing = '';
					loopBlocks.push(loopBlock);

					const endBkKey = end && end.split('::') && end.split('::')[end.split('::').length - 1];
					const loopData: any = get(data, endBkKey);
					if (loopData) {
						loopData.forEach((_, i) => {
							loopBlocks.forEach((loopBlock) => {
								const block = processBlock(loopBlock, i, endBkKey);
								if (block) newBlocks.push(block);
							});
						});
					} else newBlocks.push(block); // if not done this, then if no data is sent, whole block gets removed. We may need to still show the block with no data like ____ of ____
					return;
				}
				if (dataMode) {
					if (!doneProcessing[currentlyProcessing]) {
						loopBlocks.push(loopBlock);

						// do this if need loop in individual block; else just add in end bk as being done currently
						// key.forEach((e, i) => loopBlocks.push(processInline(loopBlock.inlines, i)));
						doneProcessing[currentlyProcessing] = true;
					}
					return;
				}
				if (start) {
					dataMode = true;
					currentlyProcessing = start;
					processing[start] = true;
					if (currentlyProcessing === start) loopBlocks = [];
					loopBlocks.push(loopBlock);
					// do this if need loop in individual block; else just add in end bk as being done currently
					// key.forEach((e, i) => loopBlocks.push(processInline(loopBlock.inlines, i)));
					return;
				}
				newBlocks.push(loopBlock);
			});
		section.blocks = newBlocks.length ? newBlocks : section.blocks;
	});
	return sfdt;
};
