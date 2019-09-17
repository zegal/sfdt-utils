import updateBookmarkContent from '../updateBookmarkContent'

const documentEditor = {
	getBookmarks() {
		return []
	},
	selection: {
		selectBookmark: jest.fn()
	},
	editor: {
		insertText: jest.fn()
	}
}

describe('updateBookmarkContent', function() {
	test('', function() {
		updateBookmarkContent('one', 'C', documentEditor)
	})
})
