export type inline = {
	characterFormat?: any;
	paragraphFormat?: any;
	name?: string;
	text?: string;
	bookmarkType?: number;
	inlines?: any[];
};

export type block = {
	paragraphFormat: any;
	inlines: inline[];
};

export type section = {
	blocks?: block[];
	headersFooters?: any;
};

export type sfdt = {
	sections?: section[];
};

export type listFormat = {
	listId?: number;
	listLevelNumber?: number;
};

export type style = {
	name: string;
	type: string;
	next: string;
	basedOn?: string;
	paragraphFormat?: paragraphFormat;
	characterFormat?: any;
};

export type paragraphFormat = {
	listFormat?: listFormat;
	baseStyle?: style;
};
// declare const sfdt: sfdt

export default sfdt;
