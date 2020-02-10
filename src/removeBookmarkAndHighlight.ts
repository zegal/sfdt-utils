import {DocumentEditor} from '../types/documentEditor';

import hasBookmark from './hasBookmark';

export default function remove(bookmarkName: string, documentEditor: DocumentEditor): boolean {
	if (hasBookmark(bookmarkName, documentEditor)) {
		// trying to clear selection
		documentEditor.selection.selectBookmark(bookmarkName);

		if (documentEditor.selection.contextType === 'TableText') {
			documentEditor.selection.cellFormat.background = 'NoColor';
		} else {
			documentEditor.selection.characterFormat.highlightColor = 'NoColor';
		}

		// perhaps we can use these but i dont know what to pass as they are private methods
		// documentEditor.selection.{removeSelectionHighlight,clearSelectionHighlightLineWidget}
		documentEditor.selection.moveToLineStart();

		documentEditor.editor.deleteBookmark(bookmarkName);

		return true;
	} else {
		return false;
	}
}
