import {DocumentEditor} from '@syncfusion/ej2-documenteditor'

const gotoBookmark = (bookmark: string, documentEditor: DocumentEditor) => {
	documentEditor.selection.navigateBookmark(bookmark)
}

export default gotoBookmark
