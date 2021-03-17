module.exports = {
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
				{
					paragraphFormat: {
						leftIndent: 36,
						firstLineIndent: -18,
						listFormat: {listId: 0, listLevelNumber: 0}
					},
					characterFormat: {},
					inlines: [
						{characterFormat: {}, bookmarkType: 0, name: 'LOOP::1c300d80-8143-47d6-b771-0836ea44d6ac'},
						{characterFormat: {bidi: false}, text: 'for first loop '},
						{characterFormat: {}, bookmarkType: 0, name: 'DATA::1234::entity.name'},
						{characterFormat: {bidi: false}, text: 'entity1'},
						{characterFormat: {}, bookmarkType: 1, name: 'DATA::1234::entity.name'}
					]
				},
				{
					paragraphFormat: {
						leftIndent: 36,
						firstLineIndent: -18,
						listFormat: {listId: 0, listLevelNumber: 0}
					},
					characterFormat: {},
					inlines: [{characterFormat: {bidi: false}, text: 'for second loop '},
          {characterFormat: {}, bookmarkType: 0, name: 'DATA::5678::entity.name'},
          {characterFormat: {bidi: false}, text: 'entity1'},
          {characterFormat: {}, bookmarkType: 1, name: 'DATA::5678::entity.name'}]
				},
				{
					paragraphFormat: {
						leftIndent: 36,
						firstLineIndent: -18,
						listFormat: {listId: 0, listLevelNumber: 0}
					},
					characterFormat: {},
					inlines: [
						{characterFormat: {bidi: false}, text: 'last loop'},
						{characterFormat: {}, bookmarkType: 1, name: 'LOOP::1c300d80-8143-47d6-b771-0836ea44d6ac'}
					]
				}
			],
			headersFooters: {}
		}
	],
	characterFormat: {
		bold: false,
		italic: false,
		fontSize: 11,
		fontFamily: 'Calibri',
		underline: 'None',
		strikethrough: 'None',
		baselineAlignment: 'Normal',
		highlightColor: 'NoColor',
		fontColor: '#000000',
		fontSizeBidi: 11,
		fontFamilyBidi: 'Calibri'
	},
	paragraphFormat: {
		leftIndent: 0,
		rightIndent: 0,
		firstLineIndent: 0,
		textAlignment: 'Left',
		beforeSpacing: 0,
		afterSpacing: 0,
		lineSpacing: 1,
		lineSpacingType: 'Multiple',
		listFormat: {},
		bidi: false
	},
	defaultTabWidth: 36,
	enforcement: false,
	hashValue: '',
	saltValue: '',
	formatting: false,
	protectionType: 'NoProtection',
	styles: [
		{
			name: 'Normal',
			type: 'Paragraph',
			paragraphFormat: {listFormat: {}},
			characterFormat: {},
			next: 'Normal'
		},
		{
			name: 'Heading 1',
			type: 'Paragraph',
			paragraphFormat: {
				leftIndent: 0,
				rightIndent: 0,
				firstLineIndent: 0,
				textAlignment: 'Left',
				beforeSpacing: 12,
				afterSpacing: 0,
				lineSpacing: 1.0791666507720947,
				lineSpacingType: 'Multiple',
				outlineLevel: 'Level1',
				listFormat: {}
			},
			characterFormat: {
				fontSize: 16,
				fontFamily: 'Calibri Light',
				fontColor: '#2F5496'
			},
			basedOn: 'Normal',
			link: 'Heading 1 Char',
			next: 'Normal'
		},
		{
			name: 'Heading 1 Char',
			type: 'Character',
			characterFormat: {
				fontSize: 16,
				fontFamily: 'Calibri Light',
				fontColor: '#2F5496'
			},
			basedOn: 'Default Paragraph Font'
		},
		{
			name: 'Default Paragraph Font',
			type: 'Character',
			characterFormat: {}
		},
		{
			name: 'Heading 2',
			type: 'Paragraph',
			paragraphFormat: {
				leftIndent: 0,
				rightIndent: 0,
				firstLineIndent: 0,
				textAlignment: 'Left',
				beforeSpacing: 2,
				afterSpacing: 0,
				lineSpacing: 1.0791666507720947,
				lineSpacingType: 'Multiple',
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
		},
		{
			name: 'Heading 2 Char',
			type: 'Character',
			characterFormat: {
				fontSize: 13,
				fontFamily: 'Calibri Light',
				fontColor: '#2F5496'
			},
			basedOn: 'Default Paragraph Font'
		},
		{
			name: 'Heading 3',
			type: 'Paragraph',
			paragraphFormat: {
				leftIndent: 0,
				rightIndent: 0,
				firstLineIndent: 0,
				textAlignment: 'Left',
				beforeSpacing: 2,
				afterSpacing: 0,
				lineSpacing: 1.0791666507720947,
				lineSpacingType: 'Multiple',
				outlineLevel: 'Level3',
				listFormat: {}
			},
			characterFormat: {
				fontSize: 12,
				fontFamily: 'Calibri Light',
				fontColor: '#1F3763'
			},
			basedOn: 'Normal',
			link: 'Heading 3 Char',
			next: 'Normal'
		},
		{
			name: 'Heading 3 Char',
			type: 'Character',
			characterFormat: {
				fontSize: 12,
				fontFamily: 'Calibri Light',
				fontColor: '#1F3763'
			},
			basedOn: 'Default Paragraph Font'
		},
		{
			name: 'Heading 4',
			type: 'Paragraph',
			paragraphFormat: {
				leftIndent: 0,
				rightIndent: 0,
				firstLineIndent: 0,
				textAlignment: 'Left',
				beforeSpacing: 2,
				afterSpacing: 0,
				lineSpacing: 1.0791666507720947,
				lineSpacingType: 'Multiple',
				outlineLevel: 'Level4',
				listFormat: {}
			},
			characterFormat: {
				italic: true,
				fontFamily: 'Calibri Light',
				fontColor: '#2F5496'
			},
			basedOn: 'Normal',
			link: 'Heading 4 Char',
			next: 'Normal'
		},
		{
			name: 'Heading 4 Char',
			type: 'Character',
			characterFormat: {
				italic: true,
				fontFamily: 'Calibri Light',
				fontColor: '#2F5496'
			},
			basedOn: 'Default Paragraph Font'
		},
		{
			name: 'Heading 5',
			type: 'Paragraph',
			paragraphFormat: {
				leftIndent: 0,
				rightIndent: 0,
				firstLineIndent: 0,
				textAlignment: 'Left',
				beforeSpacing: 2,
				afterSpacing: 0,
				lineSpacing: 1.0791666507720947,
				lineSpacingType: 'Multiple',
				outlineLevel: 'Level5',
				listFormat: {}
			},
			characterFormat: {
				fontFamily: 'Calibri Light',
				fontColor: '#2F5496'
			},
			basedOn: 'Normal',
			link: 'Heading 5 Char',
			next: 'Normal'
		},
		{
			name: 'Heading 5 Char',
			type: 'Character',
			characterFormat: {
				fontFamily: 'Calibri Light',
				fontColor: '#2F5496'
			},
			basedOn: 'Default Paragraph Font'
		},
		{
			name: 'Heading 6',
			type: 'Paragraph',
			paragraphFormat: {
				leftIndent: 0,
				rightIndent: 0,
				firstLineIndent: 0,
				textAlignment: 'Left',
				beforeSpacing: 2,
				afterSpacing: 0,
				lineSpacing: 1.0791666507720947,
				lineSpacingType: 'Multiple',
				outlineLevel: 'Level6',
				listFormat: {}
			},
			characterFormat: {
				fontFamily: 'Calibri Light',
				fontColor: '#1F3763'
			},
			basedOn: 'Normal',
			link: 'Heading 6 Char',
			next: 'Normal'
		},
		{
			name: 'Heading 6 Char',
			type: 'Character',
			characterFormat: {
				fontFamily: 'Calibri Light',
				fontColor: '#1F3763'
			},
			basedOn: 'Default Paragraph Font'
		}
	],
	lists: [
		{abstractListId: 0, listId: 0},
		{abstractListId: 1, listId: 1}
	],
	abstractLists: [
		{
			abstractListId: 0,
			levels: [
				{
					characterFormat: {},
					paragraphFormat: {
						leftIndent: 36,
						firstLineIndent: -18,
						listFormat: {}
					},
					followCharacter: 'Tab',
					listLevelPattern: 'Arabic',
					numberFormat: '%1.',
					restartLevel: 0,
					startAt: 1
				}
			]
		},
		{
			abstractListId: 1,
			levels: [
				{
					characterFormat: {},
					paragraphFormat: {
						leftIndent: 36,
						firstLineIndent: -18,
						listFormat: {}
					},
					followCharacter: 'Space',
					listLevelPattern: 'Arabic',
					numberFormat: '%1.',
					restartLevel: 0,
					startAt: 1
				}
			]
		}
	]
};
