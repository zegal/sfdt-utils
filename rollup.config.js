import typescript from 'rollup-plugin-typescript';
// import terser from 'rollup-plugin-terser'

export default {
	input: {
		index: 'src/index.ts',

		populate: 'src/sfdt/populate.ts',
		processInlines: 'src/sfdt/processInlines.ts',
		toggleBookmark: 'src/sfdt/toggleBookmark.ts',
		SFDTbookmarkHighlight: 'src/sfdt/bookmarkHighlight.ts',

		getCurrentSelection: 'src/getCurrentSelection.ts',
		unselect: 'src/unselect.ts',

		getCrossRefData: 'src/sfdt/crossReference.ts',
		loop: 'src/sfdt/loopCondition.ts',

		updateBookmarkContent: 'src/updateBookmarkContent.ts',
		insertBookmark: 'src/insertBookmark.ts',
		queryBookmark: 'src/queryBookmark.ts',
		bookmarkHighlight: 'src/bookmarkHighlight.ts',
		removeBookmarkAndHighlight: 'src/removeBookmarkAndHighlight.ts',
		replaceSfdtBookmarks: 'src/sfdt/replaceSfdtBookmarks.ts',

		getSFDTjson: 'src/getSFDTjson.ts',
		getSFDTstring: 'src/getSFDTstring.ts',
		showCaret: 'src/showCaret.ts'
	},
	external: ['lodash'],
	output: [
		{
			dir: '.',
			format: 'cjs'
		}
	],
	plugins: [
		// terser(),
		typescript()
	]
};
