// @todo: fix when we get an sfdt type
type inlineObject = any;

export const isBookmark: (inlineObject: inlineObject) => inlineObject | boolean = (inlineObject) => {
	if (inlineObject.bookmarkType !== undefined) {
		return inlineObject
	}

	return false
}

export const isMatchingBookmark = (inlineObject, name) => {
	const matched = isBookmark(inlineObject)

	if (matched && matched.name === name) {
		return matched
	}

	return false
}

export const isBookmarkStart = (inlineObject) => {
	const matched = isBookmark(inlineObject)

	if (matched && matched.bookmarkType === 0) {
		return matched
	}

	return false
}

export const isBookmarkEnd = (inlineObject) => {
	const matched = isBookmark(inlineObject)

	if (matched && matched.bookmarkType === 1) {
		return matched
	}

	return false
}
