import {DocumentEditor} from '../types/documentEditor';

const whichBookmarksAreCurrentlySelected = (documentEditor: DocumentEditor, action: (bookmarks: string[]) => any) => {
	const bookmarks = documentEditor.selection.bookmarks;

	// this is because the '.selection.bookmarks' is unstable and crashes lots
	// so if do a following action here, it will fail safely on the wrapping try/catch it their API crashes
	if (action) {
		action(bookmarks);
	}

	return bookmarks;
};

export default whichBookmarksAreCurrentlySelected;
