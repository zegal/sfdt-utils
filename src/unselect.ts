import {DocumentEditor} from '@syncfusion/ej2-documenteditor'

const unselect = (documentEditor: DocumentEditor) => {
	documentEditor.selection.moveToLineEnd()
}

export default unselect
