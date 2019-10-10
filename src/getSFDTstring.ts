import getSFDTjson from './getSFDTjson'

/**
* @param {Object} documentEditor - Instance of the SF document editor
*/
export default ({documentEditor, sections = false}) => {
	return getSFDTjson({documentEditor}).then((json) => {
		if (json.error) {
			return 'There was an error with your json'
		}

		const returnObject = sections
			? json.sections
			: json

		return JSON.stringify(returnObject, null, 1)
	})
}
