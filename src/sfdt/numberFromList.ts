import get from 'lodash/get';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import {block as BlockType} from '../../types/sfdt';
import {isNullOrUndefined} from './listHelpers';
import Dictionary from '../dictionary';
import {getAsRoman, getAsLetter, getAsLeadingZero} from './generateListLetters';

export const updateListValues = () => {};
export const getListText = () => {};

export const getListFormatFromBlock = (block: BlockType) => {
	const blockParagraphFormat = get(block, 'paragraphFormat');
	const listFormat = get(blockParagraphFormat, 'listFormat');

	if (listFormat && !isEmpty(listFormat)) {
		return listFormat;
	}

	return {};
};

const renderedLists = new Dictionary();
let renderedListFormats = {};

function createSfdt(sfdt) {
	const newSfdt = {...sfdt};
	const clearList = () => {
		renderedLists.clear();
		renderedListFormats = {};
	};

	function getListById(listId) {
		// extract list from newSfdt
		const lists = get(newSfdt, 'lists');
		if (isNullOrUndefined(lists)) {
			return undefined;
		}

		for (let element of lists) {
			if (!isNullOrUndefined(element) && get(element, 'listId') === listId) {
				return element;
			}
		}
		return undefined;
	}

	function getAbstractListById(id) {
		// extract abstractLists from sfdt
		const abstractLists = get(sfdt, 'abstractLists');
		if (isNullOrUndefined(abstractLists)) {
			return undefined;
		}

		for (let element of abstractLists) {
			if (get(element, 'abstractListId') === id) {
				return element;
			}
		}
		return undefined;
	}

	function getListLevelPattern(value) {
		switch (value) {
			case '0':
			case '1':
				return 'Arabic';
			case 'I':
				return 'UpRoman';
			case 'i':
				return 'LowRoman';
			case 'A':
				return 'UpLetter';
			case 'a':
				return 'LowLetter';
			case '*':
			case '-':
				return 'Bullet';
			case '00':
			case '01':
				return 'LeadingZero';
			default:
				return 'None';
		}
	}

	function addListLevels(abstractList) {
		for (let i = abstractList.levels.length; i < 9; i++) {
			let listLevel = {} as any;
			let val = i % 3;
			if (abstractList.levels[0].listLevelPattern === 'Bullet') {
				listLevel.listLevelPattern = 'Bullet';
				listLevel.numberFormat = val === 0 ? '\uf0b7' : val === 1 ? '\uf0a7' : '\uf0d8';
				listLevel.characterFormat.fontFamily =
					listLevel.numberFormat === '\uf0a7' || '\uf0d8' ? 'Wingdings' : 'Symbol';
			} else {
				listLevel.listLevelPattern = getListLevelPattern(val);
				listLevel.numberFormat = '%' + (i + 1).toString() + '.';
				listLevel.startAt = 1;
				listLevel.restartLevel = i;
			}
			listLevel.paragraphFormat = '';
			listLevel.paragraphFormat.leftIndent = 48 * (i + 1);
			listLevel.paragraphFormat.firstLineIndent = -24;
			abstractList.levels.push(listLevel);
		}
	}

	function getListLevel(list, listLevelNumber) {
		if (!isNullOrUndefined(list)) {
			let abstractList = getAbstractListById(list.abstractListId);
			if (
				!isNullOrUndefined(list) &&
				abstractList.levels.length <= listLevelNumber &&
				listLevelNumber >= 0 &&
				listLevelNumber < 9
			) {
				addListLevels(abstractList);
			}
			let levelOverrideAdv = undefined;
			let level = false;
			level =
				!isNullOrUndefined(list.levelOverrides) &&
				!isNullOrUndefined((levelOverrideAdv = list.levelOverrides[listLevelNumber])) &&
				!isNullOrUndefined(levelOverrideAdv.overrideListLevel);
			if (level) {
				return levelOverrideAdv.overrideListLevel;
			} else if (
				!isNullOrUndefined(abstractList) &&
				listLevelNumber >= 0 &&
				listLevelNumber < abstractList.levels.length
			) {
				return abstractList.levels[listLevelNumber];
			}
		}
		return undefined;
	}

	function getListStartValue(listLevelNumber, list) {
		// tslint:disable-next-line:max-line-length
		let levelOverride = !isNullOrUndefined(list.levelOverrides) ? list.levelOverrides[listLevelNumber] : undefined;
		if (!isNullOrUndefined(levelOverride) && isNullOrUndefined(levelOverride.overrideListLevel)) {
			return levelOverride.startAt;
		}
		let listLevel = getListLevel(list, listLevelNumber);
		if (isNullOrUndefined(listLevel)) {
			return 0;
		} else {
			return listLevel.startAt;
		}
	}

	function updateListValues(list, listLevelNumber, listLevel) {
		const abstractListId = get(list, 'abstractListId');
		let nestedListVal = {};
		if (!renderedLists.containsKey(getAbstractListById(abstractListId))) {
			let startVal = new Dictionary();
			renderedLists.add(getAbstractListById(abstractListId), startVal);
			renderedListFormats[getAbstractListById(abstractListId)] = {};
			for (let i = 0; i <= listLevelNumber; i++) {
				startVal.add(i, getListStartValue(i, list));
			}
			nestedListVal = {
				levels: Array.isArray(startVal.valuesInternal) ? startVal.valuesInternal : [startVal.valuesInternal],
				formats: {[listLevelNumber]: listLevel}
			};
		} else {
			// tslint:disable-next-line:max-line-length
			let levels = renderedLists.get(getAbstractListById(abstractListId));
			let formats = renderedListFormats[getAbstractListById(abstractListId)];
			if (levels.containsKey(listLevelNumber)) {
				let startAt = levels.get(listLevelNumber);
				levels.set(listLevelNumber, startAt + 1);
				formats[listLevelNumber] = listLevel;

				let levelNumber = listLevelNumber + 1;
				while (levelNumber < getAbstractListById(abstractListId).levels.length) {
					// if (!isNullOrUndefined(listLevel)) {
					if (levels.containsKey(levelNumber) && get(listLevel, 'restartLevel') > listLevelNumber) {
						levels.remove(levelNumber);
						delete formats[levelNumber];
						// if (document.renderedListLevels.indexOf(listLevel) > -1) {
						//     document.renderedListLevels.pop();
						// }
					}
					// }
					levelNumber++;
				}
			} else {
				let levelNumber = listLevelNumber;
				while (!levels.containsKey(levelNumber - 1) && levelNumber > 0) {
					// if (!isNullOrUndefined(listLevel)) {
					levels.add(levelNumber - 1, getListStartValue(levelNumber - 1, list));
					formats[listLevelNumber - 1] = listLevel;
					// }
					levelNumber--;
				}
				let startAt = getListStartValue(listLevelNumber, list);
				levels.add(listLevelNumber, startAt);
				formats[listLevelNumber] = listLevel;
			}

			nestedListVal = {
				levels: Array.isArray(levels.valuesInternal) ? levels.valuesInternal : [levels.valuesInternal],
				formats
			};
		}
		return nestedListVal;
	}

	function getListTextListLevel(listLevel, listValue: number): string {
		const getRoman: any = getAsRoman();
		switch (listLevel.listLevelPattern) {
			case 'UpRoman':
				return getRoman.convertToRoman(listValue).toUpperCase();
			case 'LowRoman':
				return getRoman.convertToRoman(listValue).toLowerCase();
			case 'UpLetter':
				return getRoman.convertToRoman(listValue).toUpperCase();
			case 'LowLetter':
				return getAsLetter(listValue).toLowerCase();
			case 'Arabic':
				return listValue.toString();
			case 'LeadingZero':
				return getAsLeadingZero(listValue);
			case 'Number':
				return listValue.toString();
			case 'OrdinalText':
				return listValue.toString();
			case 'Ordinal':
				return listValue.toString();
			case 'FarEast':
				return listValue.toString();
			case 'Special':
				return listValue.toString();
			default:
				return '';
		}
	}

	/**
	 * Gets list text
	 * @param listAdv
	 * @param listLevelNumber
	 * @param currentListLevel
	 * @param document
	 */
	function getListText(listAdv, listLevelNumber, currentListLevel) {
		let listText = currentListLevel.numberFormat;
		// tslint:disable-next-line:max-line-length
		if (renderedLists.containsKey(getAbstractListById(listAdv.abstractListId))) {
			let levels = renderedLists.get(getAbstractListById(listAdv.abstractListId));
			let keys = levels.keys();
			for (let i = 0; i < keys.length; i++) {
				let levelNumber = keys[i];
				let levelKey = '%' + (levelNumber + 1).toString();
				let listLevel = getListLevel(listAdv, levelNumber);
				if (listText.match(levelKey)) {
					if (levelNumber > listLevelNumber) {
						return '';
					} else if (levels.containsKey(levelNumber) && !isNullOrUndefined(listLevel)) {
						listText = listText.replace(levelKey, getListTextListLevel(listLevel, levels.get(levelNumber)));
					} else {
						listText = listText.replace(levelKey, '0');
					}
				}
			}
		}
		return listText;
	}

	function getListTextAsFormat(listFormat, listNumber, depth) {
		const {numberFormat} = listFormat;

		let number = getListTextListLevel(listFormat, listNumber);
		let formatToReplace = numberFormat.split('%');
		let listTextWithFormat = formatToReplace.filter((val) => val.includes(depth))[0];
		// Remove the dot. We'll add later
		// if (listTextWithFormat.includes('.')) listTextWithFormat = listTextWithFormat.replace('.', '');
		return listTextWithFormat.replace(/\d/g, number);
	}
	/**
   
   * @param {Object} levelSteps format gives numberformat for each level number in the levels
   */
	function getAllListText(levelSteps) {
		const {formats, levels} = levelSteps;
		let listText = [];
		forEach(Object.keys(formats), (index) => {
			listText.push(getListTextAsFormat(formats[index], levels[index], parseInt(index) + 1));
		});
		return listText.join('');
	}

	function getNumberFromList(block: BlockType, isAnchor) {
		const listFormat = getListFormatFromBlock(block);
		const list = getListById(listFormat.listId);
		const levelNumber = listFormat.listLevelNumber;
		const listLevel = getListLevel(list, listFormat.listLevelNumber);

		// listId is also -1 sometimes in sfdt, in such cases there is no list from id that we need although the block has listformat
		if (list) {
			let levelSteps = updateListValues(list, levelNumber, listLevel);
			if (isAnchor(block)) {
				return getAllListText(levelSteps);
			}
		}
		return null;
	}

	return {
		getNumberFromList,
		clearList,
		sfdt
	};
}

export default createSfdt;
