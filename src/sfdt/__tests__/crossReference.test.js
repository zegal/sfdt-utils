import getCrossRefData from '../crossReference';

import crossRefSfdt from './fixtures/crossRefSfdt';
import crossRefWithStyle from './fixtures/crossreference-fromStyleName';
import multiNestedCrossRef from './fixtures/nestedCrossRef';

describe('crossReference', () => {
	it('findAnchorAndUpdate', () => {
		const originalSfdt = crossRefSfdt;
		// // Delete a list block (array position 5)
		const blocks = originalSfdt.sections[0].blocks;
		originalSfdt.sections[0].blocks = blocks.slice(0, 5).concat(blocks.slice(6, blocks.length));
		const refData = getCrossRefData(originalSfdt);
		expect(refData['TermsConditions']).toBe('4.1.');
	});

	it('findAnchorAndUpdate multiple nested list condition', () => {
		const originalSfdt = multiNestedCrossRef;

		let refData = getCrossRefData(originalSfdt);

		expect(refData['2']).toBe('2.');
		expect(refData['iii']).toBe('4.c)iv.');
		expect(refData['mkg']).toBe('iii)');
		expect(refData['3.3']).toBe(undefined); // this ref has no anchor
	});

	it('findAnchorAndUpdate multiple nested list condition defined by style', () => {
		const originalSfdt = crossRefWithStyle;

		let refData = getCrossRefData(originalSfdt);

		expect(refData['4.2']).toBe('4.2');
		expect(refData['4.1(b)']).toBe('4.1(a)');
	});
});
