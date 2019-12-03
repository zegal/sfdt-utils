import {DocumentEditor} from '../types/documentEditor'

const unselect = (documentEditor: DocumentEditor) => {
	documentEditor.selection.moveToLineEnd()
}

export default unselect
