import {isBookmark} from '../queryBookmark';

describe('isBookmark', function() {
	it('should return false when undefined inlineObject is passed', () => {
		const result = isBookmark(undefined);

		expect(result).toBeFalsy();
	});

	it('should return false when inline object is not bookmark type', () => {
		const result = isBookmark({
			paragraphFormat: {
				styleName: 'Normal'
			},
			inlines: [
				{
					characterFormat: {
						bidi: false
					},
					text: 'Keep Distance with me.'
				}
			]
		});

		expect(result).toBeFalsy();
	});

	it('should return true when inline object is bookmark type', () => {
		const result = isBookmark({
			characterFormat: {
				highlightColor: ''
			},
			bookmarkType: 0,
			name: 'COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4'
		});

		expect(result).toBeTruthy();
	});

	it('should return true when inline object is bookmark type', () => {
		const result = isBookmark({
			characterFormat: {
				highlightColor: ''
			},
			bookmarkType: 1,
			name: 'COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4'
		});

		expect(result).toBeTruthy();
	});
});
