//
// block list of length: 2
//
// features:
//   - two list elements, both have default list boomkarks: (1) and (2)
//   - bookmark inside the first list element: DATA::hide
//   -
//   -

export default [
	{
		paragraphFormat: {
			textAlignment: 'Left',
			styleName: 'Normal',
			listFormat: {
				listId: 1,
				listLevelNumber: 0
			}
		},
		characterFormat: {
			fontSize: 11
		},
		inlines: [
			{
				characterFormat: {},
				bookmarkType: 0,
				name: '(1)'
			},
			{
				characterFormat: {
					bold: true,
					fontSize: 11,
					fontFamily: 'Arial'
				},
				text: 'Test On'
			},
			{
				characterFormat: {},
				bookmarkType: 0,
				name: 'DATA::hide'
			},
			{
				characterFormat: {
					bold: true,
					fontSize: 11,
					fontFamily: 'Arial',
					highlightColor: '#FFC0CB'
				},
				text: 'e'
			},
			{
				characterFormat: {
					fontSize: 11,
					fontFamily: 'Arial',
					highlightColor: '#FFC0CB'
				},
				text: ' '
			},
			{
				characterFormat: {
					bold: true,
					fontSize: 11,
					fontFamily: 'Arial',
					highlightColor: '#FFC0CB'
				},
				text: 'hidden'
			},
			{
				characterFormat: {
					fontSize: 11,
					fontFamily: 'Arial',
					highlightColor: '#FFC0CB'
				},
				text: ' conditional '
			},
			{
				characterFormat: {
					bold: true,
					fontSize: 11,
					fontFamily: 'Arial',
					highlightColor: '#FFC0CB'
				},
				text: ' string'
			},
			{
				characterFormat: {},
				bookmarkType: 1,
				name: 'DATA::hide'
			},
			{
				characterFormat: {
					bold: true,
					fontSize: 11,
					fontFamily: 'Arial'
				},
				text: ' this'
			},
			{
				characterFormat: {
					fontSize: 11,
					fontFamily: 'Arial'
				},
				text: ' should always show'
			},
			{
				characterFormat: {},
				bookmarkType: 1,
				name: '(1)'
			}
		]
	},
	{
		paragraphFormat: {
			textAlignment: 'Left',
			styleName: 'Normal',
			listFormat: {
				listId: 1,
				listLevelNumber: 0
			}
		},
		characterFormat: {
			fontSize: 11
		},
		inlines: [
			{
				characterFormat: {},
				bookmarkType: 0,
				name: '(2)'
			},
			{
				characterFormat: {
					fontSize: 11,
					fontFamily: 'Arial'
				},
				text: 'second line'
			},
			{
				characterFormat: {
					bold: true,
					fontSize: 11,
					fontFamily: 'Arial'
				},
				text: 'should'
			},
			{
				characterFormat: {
					fontSize: 11,
					fontFamily: 'Arial'
				},
				text: 'always'
			},
			{
				characterFormat: {},
				bookmarkType: 1,
				name: 'show'
			}
		]
	}
];
