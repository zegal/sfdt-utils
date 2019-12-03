export type inline = {
	characterFormat?: any,
	paragraphFormat?: any,
	name?: string,
	text?: string,
	bookmarkType?: number,
	inlines?: any[]
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
