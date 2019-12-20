import {findAnchor} from '../crossReference';

import crossRefSfdt from './fixtures/crossRefSfdt';

describe('crossReference', () => {
	describe('findAnchor', () => {
		findAnchor(crossRefSfdt, () => {});
	});
});
