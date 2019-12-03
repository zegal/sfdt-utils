import {DocumentEditor} from '../types/documentEditor'

const gotoBookmark = (bookmark: string, documentEditor: DocumentEditor) => {
	documentEditor.selection.navigateBookmark(bookmark)
}

export default gotoBookmark
