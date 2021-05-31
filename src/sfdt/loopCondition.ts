import {isNullOrUndefined} from './sfdtHelpers/utils';

// const debug = true;

// populate DATA in loop duplication
// Example:
// Bookmark: entity.name, entity.pk
// assumption: entity is unique, so calculate it before calling this function
// const loopArrDatas = {
//  entity: [
// 	  {name: 'name1', pk: 'pk1'},
// 	  {name: 'name2', pk: 'pk2'}
// ]};

/**
 * @param loopArrDatas looping array datas from client (to loop). Sent as obj: array of objects
 */

// for any entity based name, make sure the prefix is entity; eg. entity.name, entity.passport etc.

const LOOP_PREFIX = 'LOOP::';
const DATA_PREFIX = 'DATA::';

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
const populateEntityData = (inline, i) => {
	if (!isNullOrUndefined(inline.bookmarkType) && inline.name.includes(DATA_PREFIX)) {
		// check if it is entity or not
		// make entity object into dot object to calculate it => entity[0].name
		inline.name = inline.name.replace('entity.', `entity[${i}].`);
	}
	return inline;
};
const processInline = (inlines = [], i) => {
	// also remove loop inline
	inlines.forEach((inline, index) => {
		if (loopBkInInline(inline)) inlines.splice(index, 1);

		populateEntityData(inline, i);
	});
	return inlines;
};

// For now loop depends on block
export default (sfdt, loopArrDatas = {}) => {
	if (!sfdt) {
		return;
	}

	// get all Object keys from loopArrDatas
	const loopArrKeys = Object.keys(loopArrDatas);
	sfdt.sections.forEach((section) => {
		const loopBlocks = [];
		const newBlocks = [];
		let dataMode = false;
		const processing = {};
		const doneProcessing = {};
		let currentlyProcessing;
		section.blocks &&
			section.blocks.length &&
			section.blocks.forEach((block) => {
				const loopBlock = {...block};

				// containes loop bookmark start
				const start = loopBkInBlock(block, 0);
				const end = loopBkInBlock(block, 1);
				if (end) {
					processing[end] = false;
					dataMode = false;
					currentlyProcessing = '';
					loopBlocks.push(loopBlock);
					const endBkKey = end && end.split('::') && end.split('::')[end.split('::').length - 1];
					if (loopArrKeys.includes(endBkKey)) {
						const key = loopArrDatas[endBkKey];
						key.forEach((e, i) => {
							loopBlocks.forEach((loopBlock) => {
								const temp = JSON.parse(JSON.stringify(loopBlock));
								newBlocks.push({...loopBlock, inlines: processInline(temp.inlines, i)});
							});
						});
					}
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
					loopBlocks.push(loopBlock);
					// do this if need loop in individual block; else just add in end bk as being done currently
					// key.forEach((e, i) => loopBlocks.push(processInline(loopBlock.inlines, i)));
					return;
				}
				loopBlocks.push(loopBlock);
			});
		section.blocks = newBlocks.length ? newBlocks : section.blocks;
	});
	return sfdt;
};
