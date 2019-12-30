/**
 * This sfdt should have empty inlines (multiple blocks) between the condition
 * The empty inlines inside hidden condition should be removed, with no effect on other inlines outside the condition
 */

/**
 * One conditional bookmark start from here
 *
 * name: COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4
 */
const conditionInline = [
	{
		characterFormat: {
			highlightColor: ''
		},
		bookmarkType: 0,
		name: 'COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4'
	},
	{
		characterFormat: {
			highlightColor: ''
		},
		text: 'This is first paragraph.'
	}
];

/**
 * Empty inline
 */
const emptyInline = [];

/**
 * Conditional bookmark which start in firstInline end here
 * name: COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4
 */
const lastInline = [
	{
		characterFormat: {
			highlightColor: ''
		},
		text: 'This is third paragraph.'
	},
	{
		characterFormat: {
			highlightColor: ''
		},
		bookmarkType: 1,
		name: 'COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4'
	}
];

const sfdt = {
	sections: [
		{
			blocks: [
				{
					paragraphFormat: {
						styleName: 'Normal'
					},
					inlines: [
						{
							characterFormat: {
								bold: true
							},
							text: 'Multiple paragraph start'
						}
					]
				},
				{
					paragraphFormat: {
						styleName: 'Normal'
					},
					inlines: conditionInline
				},
				{
					paragraphFormat: {
						styleName: 'Normal'
					},
					inlines: emptyInline
				},
				{
					paragraphFormat: {
						styleName: 'Normal'
					},
					characterFormat: {
						highlightColor: ''
					},
					inlines: [
						{
							characterFormat: {
								highlightColor: ''
							},
							text: 'This is second paragraph.'
						}
					]
				},
				{
					paragraphFormat: {
						styleName: 'Normal'
					},
					inlines: emptyInline
				},
				{
					paragraphFormat: {
						styleName: 'Normal'
					},
					characterFormat: {
						highlightColor: ''
					},
					inlines: lastInline
				},
				{
					paragraphFormat: {
						styleName: 'Normal'
					},
					inlines: [
						{
							characterFormat: {
								bidi: false
							},
							text: 'End of Paragraph'
						}
					]
				},
				{
					paragraphFormat: {
						styleName: 'Normal'
					},
					inlines: emptyInline
				}
			]
		}
	]
};

export default sfdt;
