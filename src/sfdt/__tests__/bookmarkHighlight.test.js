import cloneDeep from 'lodash/cloneDeep';

import bookmarkHighlight from '../bookmarkHighlight';

import fixture from './fixtures/highlights';

const getData = () => cloneDeep(fixture);

const NOT_DONE = '#FFC0CB';
// const DONE = '';
const NO_COLOR = 'NoColor';

describe('SFDT: Bookmark highlight', () => {
	it('should preserve other formatting', () => {
		const data = getData();
		const bookmarks = ['DATA::UUID::1', 'DATA::UUID::2'];

		expect(data.sections[0].blocks[0].inlines[2].characterFormat.bold).toEqual(true);

		bookmarkHighlight(data, bookmarks);

		expect(data.sections[0].blocks[0].inlines[2].characterFormat.bold).toEqual(true);
	});

	it('should work for nested bookmarks', () => {
		const data = getData();
		const bookmarks = ['DATA::UUID::1', 'DATA::UUID::2'];

		bookmarkHighlight(data, bookmarks);

		expect(data.sections[0].blocks[0].inlines[2].characterFormat.highlightColor).toEqual(NO_COLOR);
		expect(data.sections[0].blocks[0].inlines[4].characterFormat.highlightColor).toEqual(NO_COLOR);
	});

	it('should work for unnested bookmarks', () => {
		const data = getData();
		const bookmarks = ['DATA::UUID::2'];

		bookmarkHighlight(data, bookmarks);

		expect(data.sections[0].blocks[0].inlines[2].characterFormat.highlightColor).toEqual(NOT_DONE);
		expect(data.sections[0].blocks[0].inlines[4].characterFormat.highlightColor).toEqual(NO_COLOR);
	});

	it('should process bookmarks in tables', () => {
		const data = getData();
		const bookmarks = ['DATA::UUID::3'];

		expect(data.sections[0].blocks[2].rows[0].cells[0].blocks[0].inlines[1].characterFormat.highlightColor).toEqual(
			NOT_DONE
		);

		bookmarkHighlight(data, bookmarks);

		expect(data.sections[0].blocks[0].inlines[2].characterFormat.highlightColor).toEqual(NOT_DONE);
		expect(data.sections[0].blocks[0].inlines[4].characterFormat.highlightColor).toEqual(NOT_DONE);
		// console.log(data.sections[0].blocks[2].rows[0].cells[0].blocks[0].inlines[1].characterFormat)
		expect(data.sections[0].blocks[2].rows[0].cells[0].blocks[0].inlines[1].characterFormat.highlightColor).toEqual(
			NO_COLOR
		);
	});

	it('should process bookmarks in tables when bookmark starts in different cell', () => {
		const data = getData();
		const bookmarks = ['DATA::UUID::4'];

		expect(data.sections[0].blocks[3].rows[0].cells[0].blocks[1].inlines[0].characterFormat.highlightColor).toEqual(
			NOT_DONE
		);

		bookmarkHighlight(data, bookmarks);

		// console.log(data.sections[0].blocks[3].rows[0].cells[0].blocks[0]) // bm start
		// console.log(data.sections[0].blocks[3].rows[0].cells[0].blocks[1].inlines[0]) // text
		// console.log(data.sections[0].blocks[3].rows[0].cells[0].blocks[1].inlines[1]) // bm end
		expect(data.sections[0].blocks[3].rows[0].cells[0].blocks[1].characterFormat.highlightColor).toEqual(NO_COLOR); // table format
		expect(data.sections[0].blocks[3].rows[0].cells[0].blocks[1].inlines[0].characterFormat.highlightColor).toEqual(
			NO_COLOR
		); // inline format
	});

	it('should also check bullet and indent highlights', () => {
		const data = getData();
		const bookmarks = ['DATA::UUID::5'];

		expect(data.sections[0].blocks[5].characterFormat.highlightColor).toEqual(NOT_DONE);
		bookmarkHighlight(data, bookmarks);
		expect(data.sections[0].blocks[5].characterFormat.highlightColor).toEqual(NO_COLOR);
	});
});
