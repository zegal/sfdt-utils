import {DocumentEditor} from '@syncfusion/ej2-documenteditor'

import action from './bookmarkAction'

/**
* @param {String} name -
* @param {Object} documentEditor - Instance of the SF document editor
* @param {String} colour -
*/
export default (name: string, documentEditor: DocumentEditor, colour: string = '') => {
	action(name, ({selection}) => {
		selection.characterFormat.highlightColor = colour
	}, documentEditor)
}
