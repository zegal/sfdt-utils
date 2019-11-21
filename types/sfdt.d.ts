type inline = {
	characterFormat?: any,
	name?: string,
	text?: string,
	bookmarkType?: number
}

type block = {
	paragraphFormat: any,
	inlines: inline[]
}

type section = {
	blocks?: block[],
	headersFooters?: any,
}

type sfdt = {
	sections?: section[],
}

// declare const sfdt: sfdt
