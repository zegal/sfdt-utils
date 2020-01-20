import updateRef from '../updateRef';

import crossRefSfdt from './fixtures/crossRefSfdt';

describe('crossReference', () => {
	it('findAnchorAndUpdate', () => {
		const originalSfdt = crossRefSfdt;
		let sfdt = updateRef(crossRefSfdt);
		// Delete a list block (array position 5)
		const blocks = originalSfdt.sections[0].blocks;
		originalSfdt.sections[0].blocks = blocks.slice(0, 5).concat(blocks.slice(6, blocks.length));

		let newSfdt = updateRef(originalSfdt);

		expect(newSfdt.sections[0].blocks[0].inlines[8].text).toBe('4.1');
	});
});
