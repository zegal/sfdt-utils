import hasBookmark from './hasBookmark'

export default function remove(bookmarkName: string, documentEditor): boolean {
	if (hasBookmark(bookmarkName, documentEditor)) {
		// trying to clear selection
		documentEditor.selection.selectBookmark(bookmarkName);
		documentEditor.selection.characterFormat.highlightColor = 'NoColor';
		// perhaps we can use these but i dont know what to pass as they are private methods
		// documentEditor.selection.{removeSelectionHighlight,clearSelectionHighlightLineWidget}
		documentEditor.selection.moveToLineStart();

		documentEditor.editor.deleteBookmark(bookmarkName);

		return true
	} else {
		return false
	}
}
