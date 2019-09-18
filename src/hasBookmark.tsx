const hasBookmark: (name: string, documentEditor: any) => boolean = (name, documentEditor) => {
	return !!documentEditor.getBookmarks().find((bookmark) => bookmark === name)
}

export default hasBookmark
