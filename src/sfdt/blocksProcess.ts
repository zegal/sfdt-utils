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
        if (block.rows) {
          processTable(block, callbackInline, callbackBlock)
        } else {
          callbackBlock(block);

          if (!block.inlines) {
            return false;
          }
          if (checkForRef) block.inlines = callbackInline(block);
          else block.inlines = callbackInline(block.inlines);
        }
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

// callback is run on each block
// things in blocks we care about:
//  - rows            // for tables
//  - inlines         // for inline content
//  - characterFormat
export const processBlocks = (parent: any, callback: TCallback) => {
	if (!parent.sections) {
		return false;
	}

	parent.sections.forEach((section, key) => {
		if (!section.blocks) {
			return false;
		}

		// If section.blocks = [] (empty array) remove the whole section from sfdt
		if (!Array.isArray(section.blocks) || section.blocks.length == 0) {
			parent.sections.splice(key, 1);
			return false;
		}

		// Check section header and footer for bookmarks
		if (section.headersFooters) {
			Object.keys(section.headersFooters).forEach((key) => {
				if (!section.headersFooters[key].blocks) {
					return false;
				}
				const blocks = section.headersFooters[key].blocks;
				blocks.forEach((block) => {
					callback(block);
				});
			});
		}
		section.blocks.forEach((block) => {
			callback(block);
		});
	});

	return true;
};

export const processSFDT = (sfdt: any, doProcess: TCallback) => {
	processBlocks(sfdt, doProcess);

	return sfdt;
};

export default processSFDT;
