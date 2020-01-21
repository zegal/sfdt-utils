type TCallback = (
	inlines: any
) => // block?: any
any;

const processTable = (parent, callbackInline: TCallback, callbackBlock, checkForRef?: boolean) => {
	if (!parent) {
		return false;
	}
	if (!parent.rows) {
		return false;
	}

	parent.rows.forEach((row) => {
		if (!row.cells) {
			return false;
		}

		row.cells.forEach((cell) => {
			if (!cell.blocks) {
				return false;
			}

			cell.blocks.forEach((block) => {
				block = callbackBlock(block);

				if (!block.inlines) {
					return false;
				}
				if (checkForRef) block.inlines = callbackInline(block);
				else block.inlines = callbackInline(block.inlines);
			});
		});
	});

	return parent;
};

export const processBlock = (block: any, callbackInline: TCallback, callbackBlock): boolean => {
	// 1. process block top level content first
	block = callbackBlock(block);

	// 2. then delve into inlines and tables:
	const processedBlock = processTable(block, callbackInline, callbackBlock);

	if (processedBlock) {
		block = processedBlock;
	}

	if (block.inlines) {
		block.inlines = callbackInline(block.inlines);
	}

	return block;
};

export const processBlockForCrossRef = (block: any, callbackInline: TCallback, callbackBlock: TCallback): boolean => {
	// 1. process block top level content first
	// For processBlock REF update, we need to make sure the block contains ref

	let newBlock = callbackBlock(block);
	// 2. then delve into inlines. The callbackInline for cross reference takes block to process on it's inlines (block is required to check if it is the block containing reference/anchor or not). This is not compatible with the processTable callbackInline
	if (newBlock) {
		const processedBlock = processTable(newBlock, callbackInline, callbackBlock, true);

		if (processedBlock) {
			newBlock = processedBlock;
		}

		if (newBlock.inlines) {
			newBlock.inlines = callbackInline(newBlock);
		}
		return newBlock;
	}

	return block;
};

// callback is run on each block
// things in blocks we care about:
//  - rows            // for tables
//  - inlines         // for inline content
//  - characterFormat
export const processBlocks = (parent: any, callback: TCallback) => {
	if (!parent.sections) {
		return false;
	}

	parent.sections.forEach((section) => {
		if (!section.blocks) {
			return false;
		}

		section.blocks.forEach((block) => {
			block = callback(block);
		});
	});

	return true;
};

export const processSFDT = (sfdt: any, doProcess: TCallback) => {
	processBlocks(sfdt, doProcess);

	return sfdt;
};

export default processSFDT;
