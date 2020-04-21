import {paragraphFormat} from './sfdt';

export type list = {
	abstractListId: number;
	listId: number;
};

export type listLevel = {
	characterFormat?: any;
	paragraphFormat?: paragraphFormat;
	listLevelPattern?: string;
	numberFormat?: string;
	restartLevel: number;
	startAt: number;
};

export type abstractList = {
	abstractListId: number;
	levels: listLevel[];
};
