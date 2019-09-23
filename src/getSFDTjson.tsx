
export default ({documentEditor}) => {
	return documentEditor.saveAsBlob('Sfdt').then(async (blob) => {
		// console.log('blob', blob)
		// https://developer.mozilla.org/en-US/docs/Web/API/Blob#Example_for_extracting_data_from_a_Blob
		const json = await (new Response(blob)).text()

		let result = {error: true}

		try {
			result = JSON.parse(json)
		} catch (e) {
			console.error('e', e);
		}

		return result
	})
}
