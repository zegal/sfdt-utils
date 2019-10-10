import {DocumentEditor} from '@syncfusion/ej2-documenteditor'

/**
* Show blinking cursor.
*
* Note:
*	One caveat is that the cursor will move to line end because
*	`documentEditor.selection.showCaret()` doesn't make the cursor
*	blink so we have to call `documentEditor.selection.moveToLineEnd()`.
*
* @param {DocumentEditor} documentEditor - live documentEditor object
*/
export default function showCaret(documentEditor: DocumentEditor): void {
	documentEditor.selection.showCaret()
	documentEditor.selection.moveToLineEnd()
}
