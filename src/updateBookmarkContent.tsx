// import {sfdt as sfdtType} from './types'
import hasBookmark from './hasBookmark'

const debug = false

/**
* Update a bookmark
*
* @param {String} name - name of bookmark
* @param {String} content - new content
* @param {Object} documentEditor - live documentEditor object
*/
const updater: (name: string, content: string, documentEditor: any) => boolean = (name, content, documentEditor) => {
// const updater: (name: string, content: string, sfdt: sfdtType) => boolean = (name, content, sfdt) => {
	if (!documentEditor) {
		console.error('documentEditor is not ready.', documentEditor)
		return false
	}

	if (!hasBookmark(name, documentEditor)) {
		debug && console.log('Bookmark NOT found for:', name)
		return false
	}

	if (!documentEditor.selection) {
		console.error('documentEditor.selection is not ready.', documentEditor)
		return false
	}

	debug && console.log('Bookmark found for:', name)

	documentEditor.selection.selectBookmark(name)
	documentEditor.editor.insertText(content)

	return true
}

export default updater
