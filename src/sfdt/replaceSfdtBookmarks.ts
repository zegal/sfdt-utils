import get from 'lodash/get';
import {block as BlockType} from './../../types/sfdt.d';
import {processSFDT, processBlock} from './blocksProcess';

// modify the bookmarks inside sfdt inlines
export default (data, sfdt) => {
	if (!sfdt) {
		return;
	}
	// process each block and inline with callback
	return processSFDT(sfdt, (block: BlockType) => {
		const callbackBlock = (block: BlockType) => {
			if (get(block, 'inlines.rows')) {
				return get(block, 'inlines');
			}
			return block;
		};

		const callbackInline = (inlines: any[]) => {
			let arrInline = [];
			inlines.forEach((inline) => {
				let newInline = {...inline};
				if (inline.name) {
					let processId = inline.name.split('::')[2];
					if (data[processId]) {
						if (newInline.bookmarkType == 0 || newInline.bookmarkType == 1) {
							newInline.name = newInline.name.replace(processId, data[processId]);
						}
					}
				}
				// return every inline with or without modification
				arrInline.push(newInline);
			});
			return arrInline;
		};

		return processBlock(block, callbackInline, callbackBlock);
	});
};
