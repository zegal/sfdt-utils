type options = {
	bookmarkName: string;
	bookmarkContent: string;
	highlightColor?: string;
}

const debug = false

/**
* Insert a bookmark at the currently selected point in the editor
*
* @param {Object} options - {
*                         	bookmarkName: String = Name of the bookmark to insert
*                         	highlightColor?: String =  Hex code of background: eg: '#FFFFFF'
*                         	bookmarkContent?: string = Change contents of the bookmark to this string
*                         }
*
* @returns {Object} documentEditor
*/
const insertBookmark: (options: options, documentEditor: any) => void = (options, documentEditor) => {
	debug && console.log('Bookmark name:', options.bookmarkName)

	// need to highlight first, before insert text
	if (options.highlightColor) {
		debug && console.log('Adding highlight:', options.highlightColor)
		documentEditor.selection.characterFormat.highlightColor = options.highlightColor
	}

	documentEditor.editor.insertBookmark(options.bookmarkName)

	if (options.bookmarkContent) {
		debug && console.log('Bookmark content:', options.bookmarkContent)
		documentEditor.editor.insertText(options.bookmarkContent)
	}

}

export default insertBookmark
