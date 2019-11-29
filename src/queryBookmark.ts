// @todo: fix when we get an sfdt type
type inlineObject = any;

// is inlineObject a bookmark?
export const isBookmark: (inlineObject: inlineObject) => inlineObject | boolean = (inlineObject) => {
	if (inlineObject.bookmarkType !== undefined) {
		return inlineObject
	}

	return false
}

// see if inlineObject is a bookmark matching the one we are checking for
export const isMatchingBookmark = (inlineObject, name) => {
	const matched = isBookmark(inlineObject)

	if (matched && matched.name === name) {
		return matched
	}

	return false
}

export const isConditionalBookmark = (inlineObject, prefix = 'COND') => {
	const {name} = inlineObject
	return (isBookmark(inlineObject) && name && name.split('::').includes(prefix)) ? true : false
}

// is inlineObject a bookmark start object
export const isBookmarkStart = (inlineObject) => {
	const matched = isBookmark(inlineObject)

	if (matched && matched.bookmarkType === 0) {
		return matched
	}

	return false
}

// is inlineObject a bookmark end object
export const isBookmarkEnd = (inlineObject) => {
	const matched = isBookmark(inlineObject)

	if (matched && matched.bookmarkType === 1) {
		return matched
	}

	return false
}

export const isToggleStart = (inlineObject) => {
	return inlineObject.hasFieldEnd ? true : false
}

export const isToggleEnd = (inlineObject) => {
	return inlineObject.fieldType === 2 ? true : false
}

export const isToggleObject = (inlineObject) => {
	return isToggleStart(inlineObject) || isToggleEnd(inlineObject)
}