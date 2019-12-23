import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import {block as BlockType} from '../../types/sfdt';
import {isNullOrUndefined} from './listHelpers';
import Dictionary from '../dictionary';

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

function createSfdt(sfdt) {
	const newSfdt = {...sfdt};
	const renderedLists = new Dictionary();

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

	function getListLevel(list, listLevelNumber) {}

	function getListStartValue(i, list) {}

	function updateListValues(list, listLevelNumber) {
		if (!renderedLists.containsKey(getAbstractListById(list.abstractListId))) {
			let startVal = new Dictionary();
			renderedLists.add(getAbstractListById(list.abstractListId), startVal);
			let listLevel = getListLevel(list, listLevelNumber);
			for (let i = 0; i <= listLevelNumber; i++) {
				startVal.add(i, getListStartValue(i, list));
			}
		} else {
			// tslint:disable-next-line:max-line-length
			let levels = renderedLists.get(getAbstractListById(list.abstractListId));
			if (levels.containsKey(listLevelNumber)) {
				let startAt = levels.get(listLevelNumber);
				levels.set(listLevelNumber, startAt + 1);
				let levelNumber = listLevelNumber + 1;
				while (levelNumber < getAbstractListById(list.abstractListId).levels.length) {
					let listLevel = getListLevel(list, levelNumber);
					// if (!isNullOrUndefined(listLevel)) {
					if (levels.containsKey(levelNumber) && get(listLevel, 'restartLevel') > listLevelNumber) {
						levels.remove(levelNumber);
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
					let listLevel = getListLevel(list, levelNumber - 1);
					// if (!isNullOrUndefined(listLevel)) {
					levels.add(levelNumber - 1, getListStartValue(levelNumber - 1, list));
					// if (document.renderedListLevels.indexOf(listLevel) !== -1) {
					//     document.renderedListLevels.push(listLevel);
					// }
					// }
					levelNumber--;
				}
				let startAt = getListStartValue(listLevelNumber, list);
				levels.add(listLevelNumber, startAt);
			}
		}
	}

	function getNumberFromList(block: BlockType) {
		const listFormat = getListFormatFromBlock(block);
		const list = getListById(listFormat.listId);
		const levelNumber = listFormat.listLevelNumber;
		// const listLevel = getListLevel(list, listFormat.listLevelNumber);
		// tslint:disable-next-line:max-line-length
		// let levelOverride = !isNullOrUndefined(list.levelOverrides) ? list.levelOverrides[levelNumber] : undefined;
		// If LevelOverride exists and have either override list level or StartAtOverride, then only list numbering will be restarted.
		// tslint:disable-next-line:max-line-length
		// if (!isNullOrUndefined(levelOverride) && !(document.renderedLevelOverrides.indexOf(levelOverride) > -1) && isNullOrUndefined(levelOverride.overrideListLevel)) {
		//     //Add List Override style
		//     document.renderedLevelOverrides.push(list.levelOverrides.getItem(levelNumber) as WLevelOverride);
		//     if (document.renderedLists.containsKey((list.wordDocument as WordDocument).getAbstractListById(list.abstractListId))) {
		// tslint:disable-next-line:max-line-length
		//         let levels: Dictionary<number, number> = document.renderedLists.get((list.wordDocument as WordDocument).getAbstractListById(list.abstractListId));
		//         if (levels.containsKey(levelNumber)) {
		//             levels.remove(levelNumber);
		//         }
		//     }
		// }
		updateListValues(list, levelNumber);
		// return getListText(list, levelNumber, listLevel);
	}

	return {
		getNumberFromList
	};
}

export default createSfdt;
