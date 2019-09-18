type options = {
	bookmarkName: string;
	bookmarkContent: string;
	highlightColor?: string;
}

/**
* Insert a bookmark at the currently selected point in the editor
*
* @param {String}  -
* @returns {String}
*/
const insertBookmark: (options: options, documentEditor: any) => void = (options, documentEditor) => {
	documentEditor.editor.insertBookmark(options.bookmarkName)

	if (options.bookmarkContent) {
		documentEditor.editor.insertText(options.bookmarkContent)
	}

	if (options.highlightColor) {
		documentEditor.selection.characterFormat.highlightColor = options.highlightColor
	}
}

export default insertBookmark
