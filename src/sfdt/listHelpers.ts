import {sfdt} from './../../types/sfdt.d';
const {isNull, isUndefined, get, find} = require('lodash');

// import Dictionary from '../dictionary';

export const isNullOrUndefined = (arg) => {
	return isNull(arg) || isUndefined(arg);
};

const getAbstractListById = (sfdt, abstractListId) => {
	let abstractLists = get(sfdt, 'abstractLists');

	const filteredAbstractList = find(abstractLists, (el) => {
		if (get(el, 'abstractListId') === abstractListId) {
			return true;
		}
		return false;
	});

	return filteredAbstractList;
};

export const getListById = (sfdt, listId) => {
	// console.log('getListById----------------', sfdt.lists, listId);
	const list = get(sfdt, 'lists');

	const filteredList = find(list, (el) => {
		if (get(el, 'listId') === listId) {
			return true;
		}
		return false;
	});
	return filteredList;
};

/**
 * Gets list level pattern
 * @param value
 */
const getListLevelPattern = function(value) {
	switch (value) {
		case 0:
			return 'Arabic';
		case 1:
			return 'UpRoman';
		case 2:
			return 'LowRoman';
		case 3:
			return 'UpLetter';
		case 4:
			return 'LowLetter';
		case 5:
			return 'Ordinal';
		case 6:
			return 'Number';
		case 7:
			return 'OrdinalText';
		case 8:
			return 'LeadingZero';
		case 9:
			return 'Bullet';
		case 10:
			return 'FarEast';
		case 11:
			return 'Special';
		default:
			return 'None';
	}
};

/**
 * Adds list level
 * @param abstractList
 */
function addListLevels(abstractList) {
	for (let i = abstractList.levels.length; i < 9; i++) {
		const listLevel = [];
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
		listLevel.paragraphFormat = {};
		listLevel.paragraphFormat.leftIndent = 48 * (i + 1);
		listLevel.paragraphFormat.firstLineIndent = -24;
		abstractList.levels.push(listLevel);
	}
}

/**
 * Gets the list level
 * @param list
 * @param listLevelNumber
 */
function getListLevel(list, listLevelNumber, sfdt) {
	if (!isNullOrUndefined(list)) {
		const abstractList = getAbstractListById(sfdt, list.abstractListId);
		// console.log('Abstract List============', abstractList);

		const abstractListLevelLength = get(abstractList, 'levels.length');
		// console.log(
		//   'Abstract List Level length----------',
		//   abstractListLevelLength
		// );
		if (
			!isNullOrUndefined(list) &&
			abstractListLevelLength <= listLevelNumber &&
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
			listLevelNumber < abstractListLevelLength
		) {
			return abstractList.levels[listLevelNumber];
		}
	}
	return undefined;
}

// /**
// * Gets list text
// * @param listAdv
// * @param listLevelNumber
// * @param currentListLevel
// * @param document
// */
// getListText(listAdv, listLevelNumber, currentListLevel) {
//   let listText = currentListLevel.numberFormat;

//   if (this.viewer.renderedLists.containsKey(getAbstractListById(listAdv.abstractListId))) {
//     let levels = this.viewer.renderedLists.get(this.viewer.getAbstractListById(listAdv.abstractListId));
//           let keys = levels.keys;
//           for (let i = 0; i < keys.length; i++) {
//               let levelNumber = keys[i];
//               let levelKey = '%' + (levelNumber + 1).toString();
//               let listLevel = this.getListLevel(listAdv, levelNumber);
//               if (listText.match(levelKey)) {
//                   if (levelNumber > listLevelNumber) {
//                       return '';
//                   }
//                   else if (levels.containsKey(levelNumber) && !isNullOrUndefined(listLevel)) {
//                       listText = listText.replace(levelKey, this.getListTextListLevel(listLevel, levels.get(levelNumber)));
//                   }
//                   else {
//                       listText = listText.replace(levelKey, '0');
//                   }
//               }
//           }
//       }
//       return listText;
// }

// const renderedLists = new Dictionary();
/**
 * Updates list values.
 * @param list
 * @param listLevelNumber
 * @param document
 */
// function updateListValues(list, listLevelNumber) {
// 	if (!renderedLists.containsKey(getAbstractListById(list.abstractListId))) {
// 		let startVal = new Dictionary();
// 		renderedLists.add(getAbstractListById(list.abstractListId), startVal);
// 		let listLevel = getListLevel(list, listLevelNumber);
// 		for (let i = 0; i <= listLevelNumber; i++) {
// 			startVal.add(i, getListStartValue(i, list));
// 		}
// 	} else {
// 		// tslint:disable-next-line:max-line-length
// 		let levels = this.viewer.renderedLists.get(this.viewer.getAbstractListById(list.abstractListId));
// 		if (levels.containsKey(listLevelNumber)) {
// 			let startAt = levels.get(listLevelNumber);
// 			levels.set(listLevelNumber, startAt + 1);
// 			let levelNumber = listLevelNumber + 1;
// 			while (levelNumber < this.viewer.getAbstractListById(list.abstractListId).levels.length) {
// 				let listLevel = this.getListLevel(list, levelNumber);
// 				// if (!isNullOrUndefined(listLevel)) {
// 				if (levels.containsKey(levelNumber) && listLevel.restartLevel > listLevelNumber) {
// 					levels.remove(levelNumber);
// 					// if (document.renderedListLevels.indexOf(listLevel) > -1) {
// 					//     document.renderedListLevels.pop();
// 					// }
// 				}
// 				// }
// 				levelNumber++;
// 			}
// 		} else {
// 			let levelNumber = listLevelNumber;
// 			while (!levels.containsKey(levelNumber - 1) && levelNumber > 0) {
// 				let listLevel = this.getListLevel(list, levelNumber - 1);
// 				// if (!isNullOrUndefined(listLevel)) {
// 				levels.add(levelNumber - 1, this.getListStartValue(levelNumber - 1, list));
// 				// if (document.renderedListLevels.indexOf(listLevel) !== -1) {
// 				//     document.renderedListLevels.push(listLevel);
// 				// }
// 				// }
// 				levelNumber--;
// 			}
// 			let startAt = this.getListStartValue(listLevelNumber, list);
// 			levels.add(listLevelNumber, startAt);
// 		}
// 	}
// }

/**
 * Gets list number.
 * @param listFormat
 * @param document
 */
export const getListNumber = function(sfdt, listFormat) {
	const list = getListById(sfdt, listFormat.listId); // this must get list of element with certain listId
	// console.log('LIST===============', list);
	const levelNumber = listFormat.listLevelNumber;
	const listLevel = getListLevel(list, levelNumber, sfdt);
	// console.log('List Level==============', listLevel);
	// tslint:disable-next-line:max-line-length
	const levelOverride = !(isNull(list.levelOverrides) || isUndefined(list.levelOverride))
		? list.levelOverrides[levelNumber]
		: undefined;

	// console.log('Level Overrides============', levelOverride);

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

	// updateListValues(list, levelNumber);
	// return getListText(list, levelNumber, listLevel);
};
