import {DocumentEditor} from '../types/documentEditor';

import bookmarkHighlight from './bookmarkHighlight';
import unselect from './unselect';

type options = {
	bookmarkName: string;
	bookmarkContent: string;
	highlightColor?: string;
	noForceUpdate?: boolean;
};

const debug = false;

/**
 * Insert a bookmark at the currently selected point in the editor
 *
 * @param {Object} options - {
 *                         	bookmarkName: String = Name of the bookmark to insert
 *                         	highlightColor?: String =  Hex code of background: eg: '#FFFFFF'
 *                         	bookmarkContent?: string = Change contents of the bookmark to this string
 *                         }
 * @param {Object} documentEditor
 */
const insertBookmark: (options: options, documentEditor: DocumentEditor) => void = (options, documentEditor) => {
	debug &&
		console.log('Bookmark info:', {
			name: options.bookmarkName,
			update: options.noForceUpdate,
			text: options.bookmarkContent
		});

	documentEditor.editor.insertBookmark(options.bookmarkName);

	if (options.highlightColor) {
		// NOTE: setTimeout is required, else sometimes this will not apply highlight properly
		setTimeout(() => {
			// 	debug && console.log('Adding highlight:', options.highlightColor)
			bookmarkHighlight(options.bookmarkName, documentEditor, options.highlightColor);
		}, 0);
	}

	if (options.bookmarkContent) {
		debug && console.log('Bookmark content:', options.bookmarkContent);
		documentEditor.editor.insertText(options.bookmarkContent);
	} else {
		if (!options.noForceUpdate) {
			// update something to stop formatting bug
			unselect(documentEditor);
		}
	}
};

export default insertBookmark;
