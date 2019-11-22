export type inline = {
	characterFormat?: any,
	name?: string,
	text?: string,
	bookmarkType?: number
}

export type block = {
	paragraphFormat: any,
	inlines: inline[]
}

export type section = {
	blocks?: block[],
	headersFooters?: any,
}

export type sfdt = {
	sections?: section[],
}

// declare const sfdt: sfdt

export default sfdt
