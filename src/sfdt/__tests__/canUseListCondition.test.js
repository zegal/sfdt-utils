import get from 'lodash/get';
import {normalizeBlockInlines} from '../canUseListCondition';

const block1 = {
	paragraphFormat: {
		styleName: 'Normal',
		listFormat: {
			listId: 27,
			listLevelNumber: 0
		}
	},
	characterFormat: {},
	inlines: [
		{
			characterFormat: {},
			bookmarkType: 0,
			name: '(f)'
		},
		{
			characterFormat: {},
			text: 'not to adopt any new share award plan, share option plan, or other employee incentive '
		},
		{
			characterFormat: {},
			text: 'scheme without the prior written consent of the Investor;'
		},
		{
			characterFormat: {},
			bookmarkType: 1,
			name: '(f)'
		},
		{
			characterFormat: {
				fontSize: 11,
				fontFamily: 'Arial',
				fontSizeBidi: 11,
				fontFamilyBidi: 'Arial'
			},
			text: ' '
		}
	]
};

describe('normalizeBlockInlines', () => {
	it('should filter out all non-condition bookmark from inlines', () => {
		const newBlock = normalizeBlockInlines(block1);

		expect(get(newBlock, 'inlines').length).toBe(2);
	});
});
