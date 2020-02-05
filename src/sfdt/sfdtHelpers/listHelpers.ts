import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import {defaultListFormat} from './sfdtConstants';
import {getCompleteParaFormat} from './paragraphHelpers';
import {isNullOrUndefined} from './utils';
import SFDTType, {block as BlockType, style as StyleType, listFormat as ListFormatType} from '../../../types/sfdt';
import {list as ListType, listLevel as ListLevelType, abstractList as AbstractListType} from '../../../types/list';

/**
 * Check for valid listFormat
 * Cases:
 * a. No listId >> default is -1 >> discard list if listId < 0(Invalid)
 * b. listId and listLevelNumber both >> proper format
 * c. listId but no listLevelNumber >> default is 0
 * @param listFormat listFormat of the paragraphFormat
 */
export const isValidListFormat = (listFormat: ListFormatType) => {
	if (isEmpty(listFormat) || listFormat.listId < 0) return false;
	return true;
};

/**
 * Returns listFormat of given paragraph block
 * 1. if the listFormat is empty; then need to check for the styleName.
 * 2. if the listFormat is invalid even if styleName is present, discard it (Such cases are seen in the list which are deleted. The list is not there (id is -1) but the format is reserved(styleName). But they are not to be calculated)
 * 3. if there is styleName, check in the styles array in sfdt; iterate through the basedOn until you get stopping format
 * getCompleteParaFormat iterates through styles to return the current updated paragraphFormat which has the required listFormat
 * @param paraBlock paragraph block
 * @param stylesArray sfdt styles array
 */
export const getListFormatOfParaFormat = (paraBlock: BlockType, stylesArray: StyleType[]) => {
	const paraFormat = get(paraBlock, 'paragraphFormat');
	// Check for listFormat. If default, return it
	const listFormat = get(paraFormat, 'listFormat');
	// if listFormat.listId = -1: the data is in the block, but is not a running list; so no need to update with the paragraphFormat styles
	// check https://github.com/syncfusion/ej2-javascript-ui-controls/blob/d19a2fcd57969a9dfb7986c02806984b873d8ff4/controls/documenteditor/src/document-editor/implementation/format/list-format.ts#L79

	if (listFormat && listFormat.listId < 0) {
		return listFormat;
	}
	// if not invalid list, then get the complete paraformat
	const updatedParaFormat = getCompleteParaFormat(paraBlock, stylesArray);
	// Compare with defaultListFormat
	return Object.assign({}, defaultListFormat, get(updatedParaFormat, 'listFormat'));
};

/**
 * Get updated listFormat number in respect to sfdt updates
 * This class just performs the calculation of listLevel from the sfdt and parse the list number text for that. For parsing listLevels as well: https://github.com/syncfusion/ej2-javascript-ui-controls/blob/b2424abb138987c42f77b67a02bd933aaccb9629/controls/documenteditor/src/document-editor/implementation/viewer/layout.ts#L1947
 * @param sfdt whole sfdt data
 */
export function ParseListLevel(sfdt: SFDTType) {
	this.sfdt = sfdt;
	this.list = {};
	this.listLevelNumber = 0;
	/**
	 * renderedLists stores the processed abstractList object (by abstractListId) with its count
	 * Since the keys are object and we don't need to iterate them (just check if the current abstractListId from the listId is processed or not), use WeakMap instead of object/Map
	 * This map is used to count the number of times the abstractList is processed, to get the list number with the levels
	 */
	this.renderedLists = new WeakMap();
	// clear the renderedLists stored
	this.clearLists = function() {
		this.renderedLists = new WeakMap();
	};

	this.setListLevel = function(list: ListType, listLevelNumber: number): void {
		this.list = list;
		this.listLevelNumber = listLevelNumber;
	};
	/**
	 * Get list by listId (from lists array in sfdt)
	 * @param listId listFormat listId from lists array
	 */
	this.getListById = function(listId: number): ListType {
		const lists = get(this.sfdt, 'lists');
		if (isNullOrUndefined(lists)) {
			return undefined;
		}

		for (const element of lists) {
			if (!isNullOrUndefined(element) && get(element, 'listId') === listId) {
				return element;
			}
		}
		return undefined;
	};
	/**
	 * Get abstract list by abstractList id (from abstractLists array in sfdt)
	 * @param id listId
	 */
	this.getAbstractListById = function(id: number): AbstractListType {
		// extract abstractLists from sfdt
		const abstractLists = get(this.sfdt, 'abstractLists');
		if (isNullOrUndefined(abstractLists)) {
			return undefined;
		}

		for (const element of abstractLists) {
			if (get(element, 'abstractListId') === id) {
				return element;
			}
		}
		return undefined;
	};

	/**
	 * Get list level from the given list and listLevelNumber
	 */
	this.getListLevel = function(): ListLevelType {
		// This is not for parsing list level, but just to return the list level if present. For cases with no listLevel defined, need to update from SF code
		if (!isNullOrUndefined(this.list)) {
			const abstractList = this.getAbstractListById(this.list.abstractListId);
			if (
				!isNullOrUndefined(abstractList) &&
				this.listLevelNumber >= 0 &&
				this.listLevelNumber < abstractList.levels.length
			) {
				return abstractList.levels[this.listLevelNumber];
			}
		}
		return undefined;
	};

	/**
	 * Get list startAt value for given listLevel
	 */
	this.getListStartValue = function(): number {
		// tslint:disable-next-line:max-line-length
		const listLevel = this.getListLevel(this.listLevelNumber);
		if (isNullOrUndefined(listLevel)) {
			return 0;
		} else {
			return listLevel.startAt || 0;
		}
	};

	/**
	 * Update the rendered list with correct list number and return the current list format and the list number
	 */
	this.updateListValues = function(): Map<any, any> {
		const abstractListId = get(this.list, 'abstractListId');
		const currentAbstractList = this.getAbstractListById(abstractListId);
		if (isNullOrUndefined(currentAbstractList)) {
			return undefined;
		}
		// store processed abstractList to count the levels later
		if (!this.renderedLists.has(currentAbstractList)) {
			// startVal to store the level number with it's format
			let startVal = new Map();
			// use map rather than object as the key is known in runtime
			this.renderedLists.set(currentAbstractList, startVal);
			for (let i = 0; i <= this.listLevelNumber; i++) {
				startVal.set(i, {number: this.getListStartValue(i, this.list), format: currentAbstractList.levels[i]});
			}
			return startVal;
		}

		let levels = this.renderedLists.get(currentAbstractList);
		if (levels.has(this.listLevelNumber)) {
			const startAt = levels.get(this.listLevelNumber).number;
			levels.set(this.listLevelNumber, {
				number: startAt + 1,
				format: currentAbstractList.levels[this.listLevelNumber]
			});
			let levelNumber = this.listLevelNumber + 1;
			while (levelNumber < currentAbstractList.levels.length) {
				if (
					levels.has(levelNumber) &&
					get(currentAbstractList.levels[this.listLevelNumber], 'restartLevel') > this.listLevelNumber
				) {
					levels.delete(levelNumber);
				}
				levelNumber++;
			}
		} else {
			let levelNumber = this.listLevelNumber;
			while (!levels.has(levelNumber - 1) && levelNumber > 0) {
				levels.set(levelNumber - 1, {
					number: this.getListStartValue(levelNumber - 1, this.list),
					format: currentAbstractList.levels[this.listLevelNumber]
				});
				levelNumber--;
			}
			let startAt = this.getListStartValue(this.listLevelNumber, this.list);
			levels.set(this.listLevelNumber, {
				number: startAt,
				format: currentAbstractList.levels[this.listLevelNumber]
			});
		}
		// Case: using styleName: the listlevelNumber can change with the same listId too. For same style 'abc' the stored data can have upto 'n' depth levels, but we need to only return upto listLevelNumber 'x':'x'<='n'. So delete 'n-x' entries
		while (levels.size > this.listLevelNumber + 1) {
			levels.delete(levels.size - 1);
		}
		return levels;
	};

	/**
	 * Processes the given list to generate its list level values
	 */
	this.parseAllListValue = function(listFormat: ListFormatType): Map<any, any> {
		const list = this.getListById(listFormat.listId);
		const listLevelNumber = listFormat.listLevelNumber;
		this.setListLevel(list, listLevelNumber);
		if (isValidListFormat(listFormat)) {
			return this.updateListValues();
		}
		return undefined;
	};
}
