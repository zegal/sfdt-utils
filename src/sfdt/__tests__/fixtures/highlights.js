import {getBookmarkInlines, getBlock} from '../utils';

export const firstBlock = {
	paragraphFormat: {
		styleName: 'Normal',
		listFormat: {}
	},
	characterFormat: {},
	inlines: [
		{
			characterFormat: {},
			text: ''
		},
		{
			characterFormat: {},
			bookmarkType: 0,
			name: 'DATA::UUID::1'
		},
		{
			characterFormat: {
				highlightColor: '#FFC0CB',
				bidi: false,
				bold: true
			},
			text: 'one coloured line from bm 1'
		},
		{
			characterFormat: {},
			bookmarkType: 0,
			name: 'DATA::UUID::2'
		},
		{
			characterFormat: {
				highlightColor: '#FFC0CB',
				bidi: false
			},
			text: 'one coloured line from 2 bms'
		},
		{
			characterFormat: {},
			bookmarkType: 1,
			name: 'DATA::UUID::1'
		},
		{
			characterFormat: {},
			bookmarkType: 1,
			name: 'DATA::UUID::2'
		}
	]
};

const secondBlock = getBlock('second');

const tableBlockOne = {
	inlines: getBookmarkInlines('3')
};

// this is a table!
const thirdBlock = {
	rows: [
		{
			cells: [
				{
					blocks: [tableBlockOne]
				}
			]
		}
	]
};

// this is a table with split bookmarks
const tableBlock41 = {
	inlines: [
		{
			characterFormat: {},
			bookmarkType: 0, // start
			name: 'DATA::UUID::4'
		}
	]
};
const tableBlock42 = {
	characterFormat: {
		highlightColor: '#FFC0CB'
	},
	inlines: [
		{
			characterFormat: {
				highlightColor: '#FFC0CB',
				bidi: false
			},
			text: '4'
		},
		{
			characterFormat: {},
			bookmarkType: 1, // end
			name: 'DATA::UUID::4'
		}
	]
};
const fourthBlock = {
	rows: [
		{
			cells: [
				{
					blocks: [tableBlock41, tableBlock42]
				}
			]
		}
	]
};

const fifthBlock = {
	inlines: [
		{
			bookmarkType: 0,
			name: 'DATA::UUID::5'
		}
	]
};
const sixthBlock = {
	characterFormat: {
		highlightColor: '#FFC0CB'
	},
	inlines: [
		{
			bookmarkType: 1,
			name: 'DATA::UUID::5'
		}
	]
};

export default {
	sections: [
		{
			sectionFormat: {
				pageWidth: 612,
				pageHeight: 792,
				leftMargin: 72,
				rightMargin: 72,
				topMargin: 72,
				bottomMargin: 72,
				differentFirstPage: false,
				differentOddAndEvenPages: false,
				headerDistance: 36,
				footerDistance: 36,
				bidi: false
			},
			blocks: [
				firstBlock,
				secondBlock,
				thirdBlock, // table test
				fourthBlock, // table test
				fifthBlock, // root level highlight - p1
				sixthBlock // root level highlight - p2
			]
		}
	]
};
