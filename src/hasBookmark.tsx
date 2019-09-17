const hasBookmark: (name: string, documentEditor: any) => boolean = (name, documentEditor) => {
	return documentEditor.getBookmarks().filter((bookmark) => bookmark === name)
}

export default hasBookmark
