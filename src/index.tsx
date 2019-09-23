export {default as populate} from './populate'
export {default as processInlines} from './processInlines'

export {default as updateBookmarkContent} from './updateBookmarkContent'
export {default as insertBookmark} from './insertBookmark'
export {default as toggleBookmark} from './toggleBookmark'

import {
	isMatchingBookmark,
	isBookmarkStart,
	isBookmarkEnd,
} from './queryBookmark'

export {
	isMatchingBookmark,
	isBookmarkStart,
	isBookmarkEnd,
}

export {default as getSFDTjson} from './getSFDTjson'
export {default as getSFDTstring} from './getSFDTstring'

// @todo:

// is selection empty
// let selection: string = documentEditor.selection.text;
// if (!documentEditor.selection.isEmpty && /\S/.test(selection)) {
