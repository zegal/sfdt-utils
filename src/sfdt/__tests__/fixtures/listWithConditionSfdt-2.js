const listWithConditionSfdt = {
  "sections": [
    {
        "sectionFormat": {
            "pageWidth": 612,
            "pageHeight": 792,
            "leftMargin": 72,
            "rightMargin": 72,
            "topMargin": 72,
            "bottomMargin": 72,
            "differentFirstPage": false,
            "differentOddAndEvenPages": false,
            "headerDistance": 36,
            "footerDistance": 36,
            "bidi": false
        },
        "blocks": [
            {
                "paragraphFormat": {
                    "leftIndent": 36,
                    "firstLineIndent": -18,
                    "styleName": "Normal",
                    "listFormat": {
                        "listId": 2,
                        "listLevelNumber": 0
                    }
                },
                "characterFormat": {},
                "inlines": [
                    {
                        "characterFormat": {
                            "highlightColor": ""
                        },
                        "bookmarkType": 0,
                        "name": "COND::firstofOne"
                    },
                    {
                        "characterFormat": {
                            "bidi": false
                        },
                        "text": "One"
                    }
                ]
            },
            {
                "paragraphFormat": {
                    "leftIndent": 96,
                    "firstLineIndent": -24,
                    "styleName": "Normal",
                    "listFormat": {
                        "listId": 2,
                        "listLevelNumber": 1
                    }
                },
                "characterFormat": {},
                "inlines": [
                    {
                        "characterFormat": {
                            "bidi": false
                        },
                        "text": "Inside 1,  One"
                    }
                ]
            },
            {
                "paragraphFormat": {
                    "leftIndent": 96,
                    "firstLineIndent": -24,
                    "styleName": "Normal",
                    "listFormat": {
                        "listId": 2,
                        "listLevelNumber": 1
                    }
                },
                "characterFormat": {},
                "inlines": [
                    {
                        "characterFormat": {
                            "bidi": false
                        },
                        "text": "Inside 1, Two"
                    },
                    {
                        "characterFormat": {
                            "highlightColor": ""
                        },
                        "bookmarkType": 1,
                        "name": "COND::firstofOne"
                    }
                ]
            },
            {
                "paragraphFormat": {
                    "leftIndent": 36,
                    "firstLineIndent": -18,
                    "styleName": "Normal",
                    "listFormat": {
                        "listId": 2,
                        "listLevelNumber": 0
                    }
                },
                "characterFormat": {},
                "inlines": [
                    {
                        "characterFormat": {
                            "highlightColor": ""
                        },
                        "bookmarkType": 0,
                        "name": "COND::3ecfa0c1-0eb3-4463-bdb8-75b8c5f0e613"
                    },
                    {
                        "characterFormat": {
                            "highlightColor": "",
                            "bidi": false
                        },
                        "text": "Two"
                    },
                    {
                        "characterFormat": {
                            "highlightColor": ""
                        },
                        "bookmarkType": 1,
                        "name": "COND::3ecfa0c1-0eb3-4463-bdb8-75b8c5f0e613"
                    }
                ]
            },
            {
                "paragraphFormat": {
                    "leftIndent": 36,
                    "firstLineIndent": -18,
                    "styleName": "Normal",
                    "listFormat": {
                        "listId": 2,
                        "listLevelNumber": 0
                    }
                },
                "characterFormat": {},
                "inlines": [
                    {
                        "characterFormat": {
                            "bidi": false
                        },
                        "text": "Three"
                    }
                ]
            },
            {
                "paragraphFormat": {
                    "leftIndent": 36,
                    "firstLineIndent": -18,
                    "styleName": "Normal",
                    "listFormat": {
                        "listId": 2,
                        "listLevelNumber": 0
                    }
                },
                "characterFormat": {},
                "inlines": [
                    {
                        "characterFormat": {
                            "bidi": false
                        },
                        "text": "Long Four Text"
                    }
                ]
            },
            {
                "paragraphFormat": {
                    "leftIndent": 36,
                    "firstLineIndent": -18,
                    "styleName": "Normal",
                    "listFormat": {
                        "listId": 2,
                        "listLevelNumber": 0
                    }
                },
                "characterFormat": {},
                "inlines": [
                    {
                        "characterFormat": {
                            "bidi": false
                        },
                        "text": "Five"
                    }
                ]
            }
        ]
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
  lists: [
    {
      abstractListId: 2,
      listId: 2
    }
  ],
  abstractLists: [
    {
      abstractListId: 2,
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
          numberFormat: '%1)',
          restartLevel: 0,
          startAt: 1
        },
        {
          characterFormat: {},
          paragraphFormat: {
            leftIndent: 96,
            firstLineIndent: -24,
            listFormat: {}
          },
          followCharacter: 'Tab',
          listLevelPattern: 'UpRoman',
          numberFormat: '%2.',
          restartLevel: 1,
          startAt: 1
        },
        {
          characterFormat: {},
          paragraphFormat: {
            leftIndent: 144,
            firstLineIndent: -24,
            listFormat: {}
          },
          followCharacter: 'Tab',
          listLevelPattern: 'LowRoman',
          numberFormat: '%3.',
          restartLevel: 2,
          startAt: 1
        },
        {
          characterFormat: {},
          paragraphFormat: {
            leftIndent: 192,
            firstLineIndent: -24,
            listFormat: {}
          },
          followCharacter: 'Tab',
          listLevelPattern: 'Arabic',
          numberFormat: '%4.',
          restartLevel: 3,
          startAt: 1
        },
        {
          characterFormat: {},
          paragraphFormat: {
            leftIndent: 240,
            firstLineIndent: -24,
            listFormat: {}
          },
          followCharacter: 'Tab',
          listLevelPattern: 'UpRoman',
          numberFormat: '%5.',
          restartLevel: 4,
          startAt: 1
        },
        {
          characterFormat: {},
          paragraphFormat: {
            leftIndent: 288,
            firstLineIndent: -24,
            listFormat: {}
          },
          followCharacter: 'Tab',
          listLevelPattern: 'LowRoman',
          numberFormat: '%6.',
          restartLevel: 5,
          startAt: 1
        },
        {
          characterFormat: {},
          paragraphFormat: {
            leftIndent: 336,
            firstLineIndent: -24,
            listFormat: {}
          },
          followCharacter: 'Tab',
          listLevelPattern: 'Arabic',
          numberFormat: '%7.',
          restartLevel: 6,
          startAt: 1
        },
        {
          characterFormat: {},
          paragraphFormat: {
            leftIndent: 384,
            firstLineIndent: -24,
            listFormat: {}
          },
          followCharacter: 'Tab',
          listLevelPattern: 'UpRoman',
          numberFormat: '%8.',
          restartLevel: 7,
          startAt: 1
        },
        {
          characterFormat: {},
          paragraphFormat: {
            leftIndent: 432,
            firstLineIndent: -24,
            listFormat: {}
          },
          followCharacter: 'Tab',
          listLevelPattern: 'LowRoman',
          numberFormat: '%9.',
          restartLevel: 8,
          startAt: 1
        }
      ]
    }
  ]
};

export default listWithConditionSfdt;