import {DocumentEditor} from '../types/documentEditor'

const getCurrentSelection = (documentEditor: DocumentEditor): string => {
	return documentEditor.editor.selection.text
}

export default getCurrentSelection
