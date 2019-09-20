import typescript from 'rollup-plugin-typescript'
// import terser from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: {
        index: 'src/index.tsx',
        populate: 'src/populate.tsx',
        processInlines: 'src/processInlines.tsx',
        updateBookmarkContent: 'src/updateBookmarkContent.tsx',
        insertBookmark: 'src/insertBookmark.tsx',
        toggleBookmark: 'src/toggleBookmark.tsx',
    },
    external: [
        'lodash',
        // 'secure-eval'
    ],
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
        resolve({
            extensions: ['.ts', '.js'],
            only: ['secure-eval'],
        }),
		// terser(),
		typescript()
	]
}
