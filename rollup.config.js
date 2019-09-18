import typescript from 'rollup-plugin-typescript'
// import terser from 'rollup-plugin-terser'

export default {
    input: {
        index: 'src/index.tsx',
        populate: 'src/populate.tsx',
        processInlines: 'src/processInlines.tsx',
        updateBookmarkContent: 'src/updateBookmarkContent.tsx',
        insertBookmark: 'src/insertBookmark.tsx'
    },
    output: [
        // {
        //     dir: 'esm',
        //     format: 'esm'
        // },
        {
            dir: '.',
            format: 'cjs'
        }
    ],
	plugins: [
		// terser(),
		typescript()
	]
}
