import {DocumentEditor} from '../types/documentEditor'

import getSFDTjson from './getSFDTjson'

/**
* @param {Object} documentEditor - Instance of the SF document editor
*/
interface Props {
	documentEditor: DocumentEditor
	sections: boolean
}

export default ({documentEditor, sections = false}): Props => {
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
