import {findAnchor, manipulateSfdtForCrossRef} from '../crossReference';

import crossRefSfdt from './fixtures/crossRefSfdt';
import l from './fixtures/l';
import cr from './fixtures/cr';
import {getInline} from '../../__tests__/utils';

describe('crossReference', () => {
	it('findAnchor', () => {
		const originalSfdt = crossRefSfdt;
		// let sfdt = findAnchor(crossRefSfdt, manipulateSfdtForCrossRef);
		// Delete a list block (array position 5)
		const blocks = originalSfdt.sections[0].blocks;
		originalSfdt.sections[0].blocks = blocks.slice(0, 5).concat(blocks.slice(6, blocks.length));

		let newSfdt = findAnchor(originalSfdt, manipulateSfdtForCrossRef);

		expect(newSfdt.sections[0].blocks[0].inlines[8].text).toBe('4.1');
	});
});
