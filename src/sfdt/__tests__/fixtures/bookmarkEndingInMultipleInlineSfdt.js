/**
 * This sfdt should have bookmark starting and ending in
 * multiple inlines
 */

/**
 * One conditional bookmark start from here
 *
 * name: COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4
 */
const firstInline = [
	{
		text: ''
	},
	{
		characterFormat: {
			highlightColor: ''
		},
		bookmarkType: 0,
		name: 'COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4'
	},
	{
		hasFieldEnd: true,
		fieldType: 0
	},
	{
		characterFormat: {
			highlightColor: ''
		},
		bookmarkType: 0,
		name: 'COND::410a27f0-117d-491d-ba28-48cf2ba058f1'
	},
	{
		hasFieldEnd: true,
		fieldType: 0
	},
	{
		characterFormat: {
			highlightColor: ''
		},
		text: 'This is first paragraph.'
	},
	{
		fieldType: 1
	},
	{
		characterFormat: {
			highlightColor: ''
		},
		bookmarkType: 1,
		name: 'COND::410a27f0-117d-491d-ba28-48cf2ba058f1'
	}
];

/**
 * Conditional bookmark which start in firstInline, has empty inline and ends here
 * name: COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4
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
		fieldType: 1
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
					inlines: firstInline
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
					characterFormat: {
						highlightColor: ''
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
							text: 'Keep Distance with me.'
						}
					]
				},
				{
					paragraphFormat: {
						styleName: 'Normal'
					},
					inlines: []
				}
			]
		}
	]
};

export default sfdt;
