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
							characterFormat: {
								bidi: false
							},
							text: 'Section 1'
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
		},
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
						styleName: 'Normal',
						listFormat: {}
					},
					characterFormat: {
						highlightColor: '#FFD300'
					},
					inlines: [
						{
							characterFormat: {
								highlightColor: 'NoColor'
							},
							bookmarkType: 0,
							name: 'COND::877ba8ee-1ccc-4979-86fb-5467b1f919b7'
						},
						{
							characterFormat: {
								highlightColor: 'NoColor',
								bidi: false
							},
							text: 'Section 2'
						},
						{
							characterFormat: {
								highlightColor: 'NoColor'
							},
							bookmarkType: 1,
							name: 'COND::877ba8ee-1ccc-4979-86fb-5467b1f919b7'
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
		},
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
						styleName: 'Normal',
						listFormat: {}
					},
					characterFormat: {},
					inlines: [
						{
							characterFormat: {
								bidi: false
							},
							text: 'Section 3'
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
		lineSpacing: 1.0791667,
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
			name: 'Default Paragraph Font',
			type: 'Character',
			characterFormat: {}
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
	lists: [],
	abstractLists: [],
	comments: []
};
