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
	test('coming soon', function() {
		updateBookmarkContent('one', 'C', documentEditor)
	})
})
