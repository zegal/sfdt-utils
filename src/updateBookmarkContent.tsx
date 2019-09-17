// import {sfdt as sfdtType} from './types'
import hasBookmark from './hasBookmark'

/**
* Update a bookmark
*
* @param {String} name - name of bookmark
* @param {String} content - new content
* @param {Object} documentEditor - live documentEditor object
*/
const updater: (name: string, content: string, documentEditor: any) => boolean = (name, content, documentEditor) => {
// const updater: (name: string, content: string, sfdt: sfdtType) => boolean = (name, content, sfdt) => {
	if (!hasBookmark(name, documentEditor)) {
		return false
	}

	documentEditor.selection.selectBookmark(name)
	documentEditor.editor.insertText(content)

	return true
}

export default updater
