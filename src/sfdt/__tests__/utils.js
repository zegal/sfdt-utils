export const getBlock = (id, inlines = []) => {
	return {
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
				text: 'block ' + id
			},
			...inlines
		]
	};
};

export const getBookmarkInlines = (id) => {
	return [
		{
			characterFormat: {},
			bookmarkType: 0,
			name: 'DATA::UUID::' + id
		},
		{
			characterFormat: {
				highlightColor: '#FFC0CB',
				bidi: false
			},
			text: 'BOOKMARKED TEXT ' + id
		},
		{
			characterFormat: {},
			bookmarkType: 1,
			name: 'DATA::UUID::' + id
		}
	];
};
