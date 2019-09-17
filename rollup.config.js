import typescript from 'rollup-plugin-typescript'
// import terser from 'rollup-plugin-terser'

export default {
    input: {
        index: 'src/index.tsx',
        processInlines: 'src/processInlines.tsx'
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
