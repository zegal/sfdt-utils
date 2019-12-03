import {DocumentEditor} from '../types/documentEditor'
import hasBookmark from './hasBookmark'

const debug = false

/**
* Perform an action on a bookmark
*
* @param {String} name - name of bookmark
* @param {Object} documentEditor - live documentEditor object
*/
const action: (name: string, action: any, documentEditor: DocumentEditor) => boolean = (name, action, documentEditor) => {
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

	action({
		selection: documentEditor.selection
	})

	// unselect
	documentEditor.selection.moveToLineEnd()
}

export default action
