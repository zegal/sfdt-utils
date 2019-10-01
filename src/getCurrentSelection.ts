import action from './bookmarkAction'

const getCurrentSelection = (documentEditor: any): string => {
	return documentEditor.editor.selection.text
}

export default getCurrentSelection
