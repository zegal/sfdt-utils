type TCallback = (
	inlines: any,
	// block?: any
) => any

const processTable = (parent, callbackInline: TCallback, callbackBlock) => {
	if (!parent.rows) {
		return false
	}

	parent.rows.forEach((row) => {
		if (!row.cells) {
			return false
		}

		row.cells.forEach((cell) => {
			if (!cell.blocks) {
				return false
			}

			cell.blocks.forEach((block) => {
				block = callbackBlock(block)

				if (!block.inlines) {
					return false
				}

				block.inlines = callbackInline(block.inlines)
			})
		})
	})

	return parent
}

export const processBlock = (block: any, callbackInline: TCallback, callbackBlock): boolean => {
	// 1. process block top level content first
	block = callbackBlock(block)

	// 2. then delve into inlines and tables:
	const processedBlock = processTable(block, callbackInline, callbackBlock)

	if (processedBlock) {
		block = processedBlock
	}

	if (block.inlines) {
		block.inlines = callbackInline(block.inlines)
	}

	return block
}

// callback is run on each block
// things in blocks we care about:
//  - rows            // for tables
//  - inlines         // for inline content
//  - characterFormat
export const processBlocks = (parent, callback) => {
	if (!parent.sections) {
		// console.warn('Missing: sections', parent)
		return false
	}

	parent.sections.forEach((section) => {
		if (!section.blocks) {
			return false
		}

		section.blocks.forEach((block) => {
			block = callback(block)
		})
	})

	return true
}

export const processSFDT = (sfdt: any, doProcess: TCallback) => {
	processBlocks(sfdt, doProcess)

	return sfdt
}

export default processSFDT
