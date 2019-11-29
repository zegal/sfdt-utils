export {default as populate} from './sfdt/populate'
export {default as processInlines} from './sfdt/processInlines'
export {default as toggleBookmark} from './sfdt/toggleBookmark'

export {default as WordExport} from './sfdtHelper/'

import unsafe_getCurrentSelection from './getCurrentSelection'
import unsafe_unselect from './unselect'
import unsafe_showCaret from './showCaret'

import {
	isMatchingBookmark as unsafe_isMatchingBookmark,
	isBookmarkStart as unsafe_isBookmarkStart,
	isBookmarkEnd as unsafe_isBookmarkEnd,
} from './queryBookmark'

export {default as getSFDTjson} from './getSFDTjson'
export {default as getSFDTstring} from './getSFDTstring'

import unsafe_updateBookmarkContent from './updateBookmarkContent'
import unsafe_insertBookmark from './insertBookmark'
import unsafe_bookmarkHighlight from './bookmarkHighlight'
import unsafe_gotoBookmark from './bookmarkNavigate'
import unsafe_bookmarksSelected from './bookmarksSelected'
import unsafe_removeBookmarkAndHighlight from './removeBookmarkAndHighlight'

const safe = (callback) => (...args) => {
	try {
		return callback(...args)
	} catch (error) {
		console.error('SF Error:', error)
	}
}

const updateBookmarkContent = safe(unsafe_updateBookmarkContent)
const insertBookmark = safe(unsafe_insertBookmark)
const bookmarkHighlight = safe(unsafe_bookmarkHighlight)
const gotoBookmark = safe(unsafe_gotoBookmark)
const removeBookmarkAndHighlight = safe(unsafe_removeBookmarkAndHighlight)

const isMatchingBookmark = safe(unsafe_isMatchingBookmark)
const isBookmarkStart = safe(unsafe_isBookmarkStart)
const isBookmarkEnd = safe(unsafe_isBookmarkEnd)
const bookmarksSelected = safe(unsafe_bookmarksSelected)

const getCurrentSelection = safe(unsafe_getCurrentSelection)
const unselect = safe(unsafe_unselect)
const showCaret = safe(unsafe_showCaret)

export {
	updateBookmarkContent,
	insertBookmark,
	bookmarkHighlight,
	gotoBookmark,
	bookmarksSelected,
	removeBookmarkAndHighlight,

	isMatchingBookmark,
	isBookmarkStart,
	isBookmarkEnd,

	getCurrentSelection,
	unselect,
	showCaret,
}

// feature to add - is selection empty:
// let selection: string = documentEditor.selection.text;
// if (!documentEditor.selection.isEmpty && /\S/.test(selection)) {
