import {DocumentEditor} from '@syncfusion/ej2-documenteditor'

import getSFDTjson from './getSFDTjson'

interface Props {
	documentEditor: DocumentEditor
	sections?: boolean
}

/**
* @param {Object} documentEditor - Instance of the SF document editor
*/
export default function getSFDTstring({documentEditor, sections = false}: Props): Promise<string> {
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
