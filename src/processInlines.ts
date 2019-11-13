// DEPRECATED, use sfdt/blocksProcess
export default (sfdt, callback) => {
	if (!sfdt.sections) {
		console.warn('Missing: sfdt.sections', sfdt)
		return false
	}

	sfdt.sections.forEach((section) => {
		if (!section.blocks) {
			return false
		}

		section.blocks.forEach((block) => {
			if (!block.inlines) {
				return false
			}

			block.inlines = callback(block.inlines)
		})
	})

	return true
}
