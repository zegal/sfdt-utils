import bookmarkHighlight from './bookmarkHighlight'

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

	documentEditor.editor.insertBookmark(options.bookmarkName)

	if (options.highlightColor) {
		// NOTE: setTimeout is required, else sometimes this will not apply highlight properly
		setTimeout(() => {
			// 	debug && console.log('Adding highlight:', options.highlightColor)
			bookmarkHighlight(options.bookmarkName, documentEditor, options.highlightColor)
		}, 0)
	}

	if (options.bookmarkContent) {
		debug && console.log('Bookmark content:', options.bookmarkContent)
		documentEditor.editor.insertText(options.bookmarkContent)
	}

}

export default insertBookmark
