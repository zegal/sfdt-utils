import {findAnchorAndUpdate, manipulateSfdtForCrossRef} from '../crossReference';

import crossRefSfdt from './fixtures/crossRefSfdt';

describe('crossReference', () => {
	it('findAnchorAndUpdate', () => {
		const originalSfdt = crossRefSfdt;
		let sfdt = findAnchorAndUpdate(crossRefSfdt, manipulateSfdtForCrossRef);
		// Delete a list block (array position 5)
		const blocks = originalSfdt.sections[0].blocks;
		originalSfdt.sections[0].blocks = blocks.slice(0, 5).concat(blocks.slice(6, blocks.length));

		let newSfdt = findAnchorAndUpdate(originalSfdt, manipulateSfdtForCrossRef);

		expect(newSfdt.sections[0].blocks[0].inlines[8].text).toBe('4.1');
	});
});
