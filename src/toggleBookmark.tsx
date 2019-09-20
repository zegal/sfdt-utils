import {secureEval} from 'secure-eval'
import {each, isNumber} from 'lodash'
import updateBookmarkContent from './updateBookmarkContent'

const toggleBookmark = (name: string, data: any, condition: string, sfdt: any) => {
	console.log('toggleBookmark name', name)
	console.log('condition', condition)
	console.log('data', data)

	let context = ''
	each(data, (value, key) => {
		context += `
			const ${key} = ${isNumber(value) ? value : ('"' + value + '"')}
		`
	})

	// console.log('context', context)

	const hax = `
	{
		${context}

		window.parent.postMessage({
			type: 'secure-eval-iframe-result',
			result: (${condition})
		}, '*')
	}
	`
	console.log('hax', hax)

	secureEval(hax).then((evalResult) => {
		console.log('evil()', evalResult)
		if (evalResult.result) {
			// toggle field
			updateBookmarkContent()
		} else {
			updateBookmarkContent('', sfdt)
		}
	})

	console.log('sfdt', sfdt)
}

export default toggleBookmark
