import get from 'lodash/get';
import filter from 'lodash/filter';

// DEPRECATED, use sfdt/blocksProcess
export default (sfdt, callback, listConditionCallback = (arg) => true) => {
	if (!sfdt.sections) {
		console.warn('Missing: sfdt.sections', sfdt);
		return false;
	}

	sfdt.sections.forEach((section) => {
		if (!section.blocks && !section.headersFooters) {
			return false;
		}

		const newBlocks = filter(section.blocks, (block) => {
			if (!block.inlines) {
				return true;
			}

			const canAddBlock = listConditionCallback(block);
			if (!canAddBlock) {
				return false;
			} else {
				let newInlines = callback(block.inlines);
				// Remove the blocks if the inline is removed i.e [] from the condition in callback function
				if (!newInlines || block.inlines.length !== newInlines.length) {
					return false;
				}

				block.inlines = newInlines;
				return true;
			}
		});
		section.blocks = newBlocks;

		if (get(section, 'headersFooters')) {
			for (let eachKey in section.headersFooters) {
				const child = section.headersFooters[eachKey];

				if (child.blocks) {
					child.blocks.forEach((block) => {
						if (!block.inlines) {
							return false;
						}
						child.inlines = callback(block.inlines);
					});
				}
			}
		}
	});

	return true;
};
