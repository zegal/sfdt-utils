const gotoBookmark = (bookmark: string, documentEditor: any) => {
	documentEditor.selection.navigateBookmark(bookmark)
}

export default gotoBookmark
