export default {
	sections: [
		{
			sectionFormat: {
				footerDistance: 36
			},
			blocks: [
				{
					paragraphFormat: {
						afterSpacing: 30,
						styleName: 'Heading 1',
						listFormat: {}
					},
					characterFormat: {},
					inlines: [
						{
							characterFormat: {},
							text: `first line`
						}
					]
				},
				{
					paragraphFormat: {
						firstLineIndent: 36,
						styleName: 'Normal',
						listFormat: {}
					},
					characterFormat: {},
					inlines: [
						{
							characterFormat: {},
							text: '[start]'
						},
						{
							text: '-a--'
						},
						{
							hasFieldEnd: true
						},
						{
							text: '-b--'
						},
						{
							fieldType: 2
						},
						{
							text: '-c--'
						},
						{
							characterFormat: {},
							text: '[end]'
						}
					]
				},

				{
					paragraphFormat: {
						styleName: 'Normal',
						listFormat: {}
					},
					characterFormat: {},
					inlines: [
						{
							characterFormat: {},
							text: 'testing testing123 testing'
						}
					]
				}
			],
			headersFooters: {
				header: {
					blocks: [
						{
							paragraphFormat: {
								listFormat: {}
							},
							characterFormat: {},
							inlines: []
						}
					]
				},
				footer: {
					blocks: [
						{
							paragraphFormat: {
								listFormat: {}
							},
							characterFormat: {},
							inlines: []
						}
					]
				}
			}
		}
	],
	characterFormat: {
		fontSize: 11,
		fontFamily: 'Calibri'
	},
	paragraphFormat: {
		lineSpacing: 1.0791667,
		lineSpacingType: 'Multiple',
		listFormat: {}
	},
	styles: [
		{
			name: 'Normal',
			type: 'Paragraph',
			paragraphFormat: {
				lineSpacing: 1.15,
				lineSpacingType: 'Multiple',
				listFormat: {}
			},
			characterFormat: {
				fontFamily: 'Calibri'
			},
			next: 'Normal'
		},
		{
			name: 'Heading 2',
			type: 'Paragraph',
			paragraphFormat: {
				beforeSpacing: 2,
				afterSpacing: 6,
				outlineLevel: 'Level2',
				listFormat: {}
			},
			characterFormat: {
				fontSize: 13,
				fontFamily: 'Calibri Light',
				fontColor: '#2F5496'
			},
			basedOn: 'Normal',
			link: 'Heading 2 Char',
			next: 'Normal'
		}
	],
	lists: [],
	abstractLists: []
};
