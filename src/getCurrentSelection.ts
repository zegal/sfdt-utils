import {DocumentEditor} from '@syncfusion/ej2-documenteditor'

import action from './bookmarkAction'

const getCurrentSelection = (documentEditor: DocumentEditor): string => {
	return documentEditor.editor.selection.text
}

export default getCurrentSelection
