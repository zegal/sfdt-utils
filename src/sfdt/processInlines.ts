import get from 'lodash/get'

// DEPRECATED, use sfdt/blocksProcess
export default (sfdt, callback) => {
	if (!sfdt.sections) {
		console.warn('Missing: sfdt.sections', sfdt)
		return false
	}

	sfdt.sections.forEach((section) => {
		if (!section.blocks && !section.headersFooters) {
			return false
		}

		section.blocks.forEach((block) => {
			if (!block.inlines) {
				return false
			}

			block.inlines = callback(block.inlines)
		})

		if (get(section, "headersFooters")) {
      for (let eachKey in section.headersFooters) {
        const child = section.headersFooters[eachKey];

        if (child.blocks) {
          child.blocks.forEach(block => {
            if (!block.inlines) {
              return false;
            }
            child.inlines = callback(block.inlines);
          });
        }
      }
    }
	})

	return true
}
