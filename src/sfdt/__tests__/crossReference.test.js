import updateRef from '../updateRef';

import crossRefSfdt from './fixtures/crossRefSfdt';
import multicf from './fixtures/nestedCrossRef';

describe('crossReference', () => {
	it('findAnchorAndUpdate', () => {
		const originalSfdt = crossRefSfdt;
		// Delete a list block (array position 5)
		const blocks = originalSfdt.sections[0].blocks;
		originalSfdt.sections[0].blocks = blocks.slice(0, 5).concat(blocks.slice(6, blocks.length));

		let newSfdt = updateRef(originalSfdt);

		expect(newSfdt.sections[0].blocks[0].inlines[8].text).toBe('4.1.');
	});

	it('findAnchorAndUpdate multiple nested list condition', () => {
		const originalSfdt = multicf;

		let newSfdt = updateRef(originalSfdt);

		expect(newSfdt.sections[0].blocks[0].inlines[2].text).toBe('2.');
		expect(newSfdt.sections[0].blocks[3].inlines[3].text).toBe('4.c)iv.');
		expect(newSfdt.sections[0].blocks[6].inlines[2].text).toBe('2.');
		expect(newSfdt.sections[0].blocks[31].inlines[2].text).toBe('iii)');
	});
});
