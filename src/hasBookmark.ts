import {DocumentEditor} from '@syncfusion/ej2-documenteditor'

/**
* Has Bookmark - Detect if a bookmark exists
*
* @param {String} name - Bookmark name
* @param {Object} documentEditor - Instance of the SF document editor
*
* @returns {Boolean} - True if the bookmark exists in the editor
*/
const hasBookmark: (name: string, documentEditor: DocumentEditor) => boolean = (name, documentEditor) => {
	return !!documentEditor.getBookmarks().find((bookmark: string) => bookmark === name)
}

export default hasBookmark
