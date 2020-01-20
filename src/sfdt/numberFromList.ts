import get from 'lodash/get';
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

class WUniqueFormats {
	items: any[];
	constructor() {
		this.items = [];
	}
	/**
	 * @private
	 */
	addUniqueFormat(format, type) {
		let matchedFormat = undefined;
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].isEqual(format, undefined, undefined)) {
				matchedFormat = this.items[i];
				break;
			}
		}
		if (isNullOrUndefined(matchedFormat)) {
			matchedFormat = new WUniqueFormat(type);
			matchedFormat.propertiesHash = format;
			matchedFormat.referenceCount = 1;
			this.items.push(matchedFormat);
		} else {
			matchedFormat.referenceCount++;
		}
		return matchedFormat;
	}
	/**
	 * @private
	 */
	updateUniqueFormat(uniqueFormat, property, value) {
		let matchedFormat = undefined;
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].isEqual(uniqueFormat.propertiesHash, property, value)) {
				matchedFormat = this.items[i];
				break;
			}
		}
		if (isNullOrUndefined(matchedFormat)) {
			matchedFormat = new WUniqueFormat(uniqueFormat.uniqueFormatType);
			matchedFormat.cloneItems(uniqueFormat, property, value, uniqueFormat.uniqueFormatType);
			matchedFormat.referenceCount = 1;
			this.items.push(matchedFormat);
		} else {
			matchedFormat.referenceCount++;
		}
		this.remove(uniqueFormat);
		uniqueFormat = undefined;
		return matchedFormat;
	}
	/**
	 * @private
	 */
	remove(uniqueFormat) {
		uniqueFormat.referenceCount--;
		if (uniqueFormat.referenceCount <= 0) {
			this.items.splice(this.items.indexOf(uniqueFormat), 1);
			uniqueFormat.destroy();
			uniqueFormat = undefined;
		}
	}
	/**
	 * @private
	 */
	clear() {
		if (isNullOrUndefined(this.items)) {
			for (let i = 0; i < this.items.length; i++) {
				this.items[i].destroy();
			}
		}
		this.items = [];
	}
	/**
	 * @private
	 */
	destroy() {
		this.clear();
		this.items = undefined;
	}
}

class WUniqueFormat {
	referenceCount: any;
	uniqueFormatType: any;
	propertiesHash: any;
	constructor(type) {
		this.referenceCount = 0;
		this.uniqueFormatType = type;
		this.propertiesHash = new Dictionary();
	}
	/**
	 * @private
	 */
	isEqual(source, property, modifiedValue) {
		let isEqual = false;
		switch (this.uniqueFormatType) {
			case 1:
				isEqual = this.isBorderEqual(source, property, modifiedValue);
				break;
			case 2:
				isEqual = this.isCharacterFormatEqual(source, property, modifiedValue);
				break;
			case 3:
				isEqual = this.isParagraphFormatEqual(source, property, modifiedValue);
				break;
			case 4:
				isEqual = this.isCellFormatEqual(source, property, modifiedValue);
				break;
			case 5:
				isEqual = this.isShadingEqual(source, property, modifiedValue);
				break;
			case 6:
				isEqual = this.isRowFormatEqual(source, property, modifiedValue);
				break;
			case 7:
				isEqual = this.isListFormatEqual(source, property, modifiedValue);
				break;
			case 8:
				isEqual = this.isTableFormatEqual(source, property, modifiedValue);
				break;
			case 9:
				isEqual = this.isListLevelEqual(source, property, modifiedValue);
				break;
			case 10:
				isEqual = this.isSectionFormatEqual(source, property, modifiedValue);
				break;
			default:
				break;
		}
		return isEqual;
	}
	// tslint:disable-next-line:max-line-length
	isNotEqual(property, source, modifiedProperty, modifiedValue, uniqueFormatType) {
		let targetValue = undefined;
		let propertyType = WUniqueFormat.getPropertyType(uniqueFormatType, property);
		if (this.propertiesHash.containsKey(propertyType)) {
			targetValue = this.propertiesHash.get(propertyType);
		}
		let sourceValue = undefined;
		if (property === modifiedProperty) {
			sourceValue = modifiedValue;
		} else if (source.containsKey(propertyType)) {
			sourceValue = source.get(propertyType);
		}
		// tslint:disable-next-line:max-line-length
		if (
			!(
				targetValue === sourceValue ||
				(!isNullOrUndefined(targetValue) && !isNullOrUndefined(sourceValue) && targetValue === sourceValue)
			)
		) {
			return true;
		}
		return false;
	}
	/**
	 * @private
	 */
	static getPropertyType(uniqueFormatType, property) {
		let type = 0;
		switch (uniqueFormatType) {
			case 1:
				type = this.getBorderPropertyType(property);
				break;
			case 2:
				type = this.getCharacterFormatPropertyType(property);
				break;
			case 3:
				type = this.getParaFormatPropertyType(property);
				break;
			case 4:
				type = this.getCellFormatPropertyType(property);
				break;
			case 5:
				type = this.getShadingPropertyType(property);
				break;
			case 6:
				type = this.getRowFormatType(property);
				break;
			case 7:
				type = this.getListFormatType(property);
				break;
			case 8:
				type = this.getTableFormatType(property);
				break;
			case 9:
				type = this.getListLevelType(property);
				break;
			case 10:
				type = this.getSectionFormatType(property);
				break;
			default:
				break;
		}
		return type;
	}
	static getRowFormatType(property) {
		if (property === 'allowBreakAcrossPages') {
			return 1;
		}
		if (property === 'isHeader') {
			return 2;
		}
		if (property === 'height') {
			return 3;
		}
		if (property === 'heightType') {
			return 4;
		}
		if (property === 'gridBefore') {
			return 5;
		}
		if (property === 'gridBeforeWidth') {
			return 6;
		}
		if (property === 'gridBeforeWidthType') {
			return 7;
		}
		if (property === 'gridAfter') {
			return 8;
		}
		if (property === 'gridAfterWidth') {
			return 9;
		}
		if (property === 'gridAfterWidthType') {
			return 10;
		}
		return 0;
	}
	static getListFormatType(property) {
		if (property === 'listId') {
			return 1;
		}
		if (property === 'listLevelNumber') {
			return 2;
		}
		return 0;
	}
	static getTableFormatType(property) {
		if (property === 'leftMargin') {
			return 1;
		}
		if (property === 'rightMargin') {
			return 2;
		}
		if (property === 'topMargin') {
			return 3;
		}
		if (property === 'bottomMargin') {
			return 4;
		}
		if (property === 'cellSpacing') {
			return 5;
		}
		if (property === 'leftIndent') {
			return 6;
		}
		if (property === 'tableAlignment') {
			return 7;
		}
		if (property === 'preferredWidth') {
			return 8;
		}
		if (property === 'preferredWidthType') {
			return 9;
		}
		if (property === 'bidi') {
			return 10;
		}
		if (property === 'allowAutoFit') {
			return 11;
		}
		return 0;
	}
	static getListLevelType(property) {
		if (property === 'listLevelPattern') {
			return 1;
		}
		if (property === 'startAt') {
			return 2;
		}
		if (property === 'followCharacter') {
			return 3;
		}
		if (property === 'numberFormat') {
			return 4;
		}
		if (property === 'restartLevel') {
			return 5;
		}
		return 0;
	}
	static getShadingPropertyType(property) {
		if (property === 'backgroundColor') {
			return 1;
		}
		if (property === 'foregroundColor') {
			return 2;
		}
		if (property === 'textureStyle') {
			return 3;
		}
		return 0;
	}
	static getCellFormatPropertyType(property) {
		if (property === 'leftMargin') {
			return 1;
		}
		if (property === 'rightMargin') {
			return 2;
		}
		if (property === 'topMargin') {
			return 3;
		}
		if (property === 'bottomMargin') {
			return 4;
		}
		if (property === 'columnSpan') {
			return 5;
		}
		if (property === 'rowSpan') {
			return 6;
		}
		if (property === 'verticalAlignment') {
			return 7;
		}
		if (property === 'preferredWidthType') {
			return 8;
		}
		if (property === 'preferredWidth') {
			return 9;
		}
		if (property === 'cellWidth') {
			return 10;
		}
		return 0;
	}
	static getBorderPropertyType(property) {
		if (property === 'color') {
			return 1;
		}
		if (property === 'lineStyle') {
			return 2;
		}
		if (property === 'lineWidth') {
			return 3;
		}
		if (property === 'shadow') {
			return 4;
		}
		if (property === 'space') {
			return 5;
		}
		if (property === 'hasNoneStyle') {
			return 6;
		}
		return 0;
	}
	static getCharacterFormatPropertyType(property) {
		if (property === 'fontColor') {
			return 1;
		}
		if (property === 'fontFamily') {
			return 2;
		}
		if (property === 'fontSize') {
			return 3;
		}
		if (property === 'bold') {
			return 4;
		}
		if (property === 'italic') {
			return 5;
		}
		if (property === 'underline') {
			return 6;
		}
		if (property === 'strikethrough') {
			return 7;
		}
		if (property === 'baselineAlignment') {
			return 8;
		}
		if (property === 'highlightColor') {
			return 9;
		}
		if (property === 'bidi') {
			return 10;
		}
		if (property === 'bdo') {
			return 11;
		}
		if (property === 'boldBidi') {
			return 12;
		}
		if (property === 'italicBidi') {
			return 13;
		}
		if (property === 'fontFamilyBidi') {
			return 14;
		}
		if (property === 'fontSizeBidi') {
			return 15;
		}
		return 0;
	}
	static getParaFormatPropertyType(property) {
		if (property === 'leftIndent') {
			return 1;
		}
		if (property === 'rightIndent') {
			return 2;
		}
		if (property === 'firstLineIndent') {
			return 3;
		}
		if (property === 'textAlignment') {
			return 4;
		}
		if (property === 'beforeSpacing') {
			return 5;
		}
		if (property === 'afterSpacing') {
			return 6;
		}
		if (property === 'lineSpacing') {
			return 7;
		}
		if (property === 'lineSpacingType') {
			return 8;
		}
		if (property === 'outlineLevel') {
			return 9;
		}
		if (property === 'bidi') {
			return 10;
		}
		return 0;
	}
	static getSectionFormatType(property) {
		if (property === 'headerDistance') {
			return 1;
		}
		if (property === 'footerDistance') {
			return 2;
		}
		if (property === 'differentFirstPage') {
			return 3;
		}
		if (property === 'differentOddAndEvenPages') {
			return 4;
		}
		if (property === 'pageWidth') {
			return 5;
		}
		if (property === 'pageHeight') {
			return 6;
		}
		if (property === 'leftMargin') {
			return 7;
		}
		if (property === 'topMargin') {
			return 8;
		}
		if (property === 'rightMargin') {
			return 9;
		}
		if (property === 'bottomMargin') {
			return 10;
		}
		if (property === 'bidi') {
			return 11;
		}
		return 0;
	}
	/**
	 * @private
	 */
	isBorderEqual(source, modifiedProperty, modifiedValue) {
		if (this.isNotEqual('color', source, modifiedProperty, modifiedValue, 1)) {
			return false;
		}
		if (this.isNotEqual('lineStyle', source, modifiedProperty, modifiedValue, 1)) {
			return false;
		}
		if (this.isNotEqual('lineWidth', source, modifiedProperty, modifiedValue, 1)) {
			return false;
		}
		if (this.isNotEqual('shadow', source, modifiedProperty, modifiedValue, 1)) {
			return false;
		}
		if (this.isNotEqual('space', source, modifiedProperty, modifiedValue, 1)) {
			return false;
		}
		if (this.isNotEqual('hasNoneStyle', source, modifiedProperty, modifiedValue, 1)) {
			return false;
		}
		return true;
	}
	/**
	 * @private
	 */
	isCharacterFormatEqual(source, modifiedProperty, modifiedValue) {
		if (this.isNotEqual('fontColor', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('fontFamily', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('fontSize', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('bold', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('italic', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('underline', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('strikethrough', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('baselineAlignment', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('highlightColor', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('bidi', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('bdo', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('fontColor', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('fontFamilyBidi', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('fontSizeBidi', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('boldBidi', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		if (this.isNotEqual('italicBidi', source, modifiedProperty, modifiedValue, 2)) {
			return false;
		}
		return true;
	}
	isParagraphFormatEqual(source, modifiedProperty, modifiedValue) {
		if (this.isNotEqual('leftIndent', source, modifiedProperty, modifiedValue, 3)) {
			return false;
		}
		if (this.isNotEqual('rightIndent', source, modifiedProperty, modifiedValue, 3)) {
			return false;
		}
		if (this.isNotEqual('firstLineIndent', source, modifiedProperty, modifiedValue, 3)) {
			return false;
		}
		if (this.isNotEqual('textAlignment', source, modifiedProperty, modifiedValue, 3)) {
			return false;
		}
		if (this.isNotEqual('beforeSpacing', source, modifiedProperty, modifiedValue, 3)) {
			return false;
		}
		if (this.isNotEqual('afterSpacing', source, modifiedProperty, modifiedValue, 3)) {
			return false;
		}
		if (this.isNotEqual('lineSpacing', source, modifiedProperty, modifiedValue, 3)) {
			return false;
		}
		if (this.isNotEqual('lineSpacingType', source, modifiedProperty, modifiedValue, 3)) {
			return false;
		}
		if (this.isNotEqual('outlineLevel', source, modifiedProperty, modifiedValue, 3)) {
			return false;
		}
		if (this.isNotEqual('bidi', source, modifiedProperty, modifiedValue, 3)) {
			return false;
		}
		return true;
	}
	/**
	 * @private
	 */
	isCellFormatEqual(source, modifiedProperty, modifiedValue) {
		if (this.isNotEqual('leftMargin', source, modifiedProperty, modifiedValue, 4)) {
			return false;
		}
		if (this.isNotEqual('rightMargin', source, modifiedProperty, modifiedValue, 4)) {
			return false;
		}
		if (this.isNotEqual('topMargin', source, modifiedProperty, modifiedValue, 4)) {
			return false;
		}
		if (this.isNotEqual('bottomMargin', source, modifiedProperty, modifiedValue, 4)) {
			return false;
		}
		if (this.isNotEqual('columnSpan', source, modifiedProperty, modifiedValue, 4)) {
			return false;
		}
		if (this.isNotEqual('rowSpan', source, modifiedProperty, modifiedValue, 4)) {
			return false;
		}
		if (this.isNotEqual('verticalAlignment', source, modifiedProperty, modifiedValue, 4)) {
			return false;
		}
		if (this.isNotEqual('preferredWidthType', source, modifiedProperty, modifiedValue, 4)) {
			return false;
		}
		if (this.isNotEqual('preferredWidth', source, modifiedProperty, modifiedValue, 4)) {
			return false;
		}
		if (this.isNotEqual('cellWidth', source, modifiedProperty, modifiedValue, 4)) {
			return false;
		}
		return true;
	}
	/**
	 * @private
	 */
	isShadingEqual(source, modifiedProperty, modifiedValue) {
		if (this.isNotEqual('backgroundColor', source, modifiedProperty, modifiedValue, 5)) {
			return false;
		}
		if (this.isNotEqual('foregroundColor', source, modifiedProperty, modifiedValue, 5)) {
			return false;
		}
		if (this.isNotEqual('textureStyle', source, modifiedProperty, modifiedValue, 5)) {
			return false;
		}
		return true;
	}
	/**
	 * @private
	 */
	isRowFormatEqual(source, modifiedProperty, modifiedValue) {
		if (this.isNotEqual('allowBreakAcrossPages', source, modifiedProperty, modifiedValue, 6)) {
			return false;
		}
		if (this.isNotEqual('isHeader', source, modifiedProperty, modifiedValue, 6)) {
			return false;
		}
		if (this.isNotEqual('height', source, modifiedProperty, modifiedValue, 6)) {
			return false;
		}
		if (this.isNotEqual('heightType', source, modifiedProperty, modifiedValue, 6)) {
			return false;
		}
		if (this.isNotEqual('gridBefore', source, modifiedProperty, modifiedValue, 6)) {
			return false;
		}
		if (this.isNotEqual('gridBeforeWidth', source, modifiedProperty, modifiedValue, 6)) {
			return false;
		}
		if (this.isNotEqual('gridBeforeWidthType', source, modifiedProperty, modifiedValue, 6)) {
			return false;
		}
		if (this.isNotEqual('gridAfter', source, modifiedProperty, modifiedValue, 6)) {
			return false;
		}
		if (this.isNotEqual('gridAfterWidth', source, modifiedProperty, modifiedValue, 6)) {
			return false;
		}
		if (this.isNotEqual('gridAfterWidthType', source, modifiedProperty, modifiedValue, 6)) {
			return false;
		}
		return true;
	}
	/**
	 * @private
	 */
	isListFormatEqual(source, modifiedProperty, modifiedValue) {
		if (this.isNotEqual('listId', source, modifiedProperty, modifiedValue, 7)) {
			return false;
		}
		if (this.isNotEqual('listLevelNumber', source, modifiedProperty, modifiedValue, 7)) {
			return false;
		}
		return true;
	}
	/**
	 * @private
	 */
	isTableFormatEqual(source, modifiedProperty, modifiedValue) {
		if (this.isNotEqual('leftMargin', source, modifiedProperty, modifiedValue, 8)) {
			return false;
		}
		if (this.isNotEqual('rightMargin', source, modifiedProperty, modifiedValue, 8)) {
			return false;
		}
		if (this.isNotEqual('topMargin', source, modifiedProperty, modifiedValue, 8)) {
			return false;
		}
		if (this.isNotEqual('bottomMargin', source, modifiedProperty, modifiedValue, 8)) {
			return false;
		}
		if (this.isNotEqual('cellSpacing', source, modifiedProperty, modifiedValue, 8)) {
			return false;
		}
		if (this.isNotEqual('leftIndent', source, modifiedProperty, modifiedValue, 8)) {
			return false;
		}
		if (this.isNotEqual('tableAlignment', source, modifiedProperty, modifiedValue, 8)) {
			return false;
		}
		if (this.isNotEqual('preferredWidth', source, modifiedProperty, modifiedValue, 8)) {
			return false;
		}
		if (this.isNotEqual('preferredWidthType', source, modifiedProperty, modifiedValue, 8)) {
			return false;
		}
		if (this.isNotEqual('bidi', source, modifiedProperty, modifiedValue, 8)) {
			return false;
		}
		if (this.isNotEqual('allowAutoFit', source, modifiedProperty, modifiedValue, 8)) {
			return false;
		}
		return true;
	}
	/**
	 * @private
	 */
	isListLevelEqual(source, modifiedProperty, modifiedValue) {
		if (this.isNotEqual('listLevelPattern', source, modifiedProperty, modifiedValue, 9)) {
			return false;
		}
		if (this.isNotEqual('startAt', source, modifiedProperty, modifiedValue, 9)) {
			return false;
		}
		if (this.isNotEqual('followCharacter', source, modifiedProperty, modifiedValue, 9)) {
			return false;
		}
		if (this.isNotEqual('numberFormat', source, modifiedProperty, modifiedValue, 9)) {
			return false;
		}
		if (this.isNotEqual('restartLevel', source, modifiedProperty, modifiedValue, 9)) {
			return false;
		}
		return true;
	}
	/**
	 * @private
	 */
	isSectionFormatEqual(source, modifiedProperty, modifiedValue) {
		if (this.isNotEqual('headerDistance', source, modifiedProperty, modifiedValue, 10)) {
			return false;
		}
		if (this.isNotEqual('footerDistance', source, modifiedProperty, modifiedValue, 10)) {
			return false;
		}
		if (this.isNotEqual('differentFirstPage', source, modifiedProperty, modifiedValue, 10)) {
			return false;
		}
		if (this.isNotEqual('differentOddAndEvenPages', source, modifiedProperty, modifiedValue, 10)) {
			return false;
		}
		if (this.isNotEqual('pageWidth', source, modifiedProperty, modifiedValue, 10)) {
			return false;
		}
		if (this.isNotEqual('pageHeight', source, modifiedProperty, modifiedValue, 10)) {
			return false;
		}
		if (this.isNotEqual('leftMargin', source, modifiedProperty, modifiedValue, 10)) {
			return false;
		}
		if (this.isNotEqual('topMargin', source, modifiedProperty, modifiedValue, 10)) {
			return false;
		}
		if (this.isNotEqual('rightMargin', source, modifiedProperty, modifiedValue, 10)) {
			return false;
		}
		if (this.isNotEqual('bottomMargin', source, modifiedProperty, modifiedValue, 10)) {
			return false;
		}
		if (this.isNotEqual('bidi', source, modifiedProperty, modifiedValue, 10)) {
			return false;
		}
		return true;
	}
	/**
	 * @private
	 */
	cloneItems(format, property, value, uniqueFormatType) {
		let propertyType = WUniqueFormat.getPropertyType(uniqueFormatType, property);
		let keys = format.propertiesHash.keys;
		for (let i = 0; i < keys.length; i++) {
			if (keys[i] === propertyType) {
				this.propertiesHash.add(propertyType, value);
			} else {
				this.propertiesHash.add(keys[i], format.propertiesHash.get(keys[i]));
			}
		}
		if (!format.propertiesHash.containsKey(propertyType)) {
			this.propertiesHash.add(propertyType, value);
		}
	}
	/**
	 * @private
	 */
	mergeProperties(format) {
		let hash = format.cloneProperties();
		let keys = this.propertiesHash.keys;
		for (let i = 0; i < keys.length; i++) {
			if (!hash.containsKey(keys[i])) {
				hash.add(keys[i], this.propertiesHash.get(keys[i]));
			}
		}
		return hash;
	}
	/**
	 * @private
	 */
	cloneProperties() {
		let hash = new Dictionary();
		let keys = this.propertiesHash.keys;
		for (let i = 0; i < keys.length; i++) {
			hash.add(keys[i], this.propertiesHash.get(keys[i]));
		}
		return hash;
	}
	// public cloneItemsInternal(format: WUniqueFormat): void {
	//     let keys: number[] = format.propertiesHash.getItem();
	//     for (let i: number = 0; i < keys.length; i++) {
	//         this.propertiesHash.add(keys[i], format.propertiesHash.get(keys[i]));
	//     }
	//     this.referenceCount = format.referenceCount;
	// }
	/**
	 * @private
	 */
	destroy() {
		if (!isNullOrUndefined(this.propertiesHash)) {
			this.propertiesHash.destroy();
		}
		this.propertiesHash = undefined;
		this.referenceCount = undefined;
		this.uniqueFormatType = undefined;
	}
}

class WListLevel {
	uniqueListLevel: any;
	paragraphFormat: any;
	characterFormat: any;
	ownerBase: any;
	constructor(node) {
		this.uniqueListLevel = undefined;
		this.paragraphFormat = undefined;
		this.characterFormat = undefined;
		this.ownerBase = node;
	}
	get listLevelPattern() {
		return this.getPropertyValue('listLevelPattern');
	}
	set listLevelPattern(listLevelPattern) {
		this.setPropertyValue('listLevelPattern', listLevelPattern);
	}
	get followCharacter() {
		return this.getPropertyValue('followCharacter');
	}
	set followCharacter(followCharacter) {
		this.setPropertyValue('followCharacter', followCharacter);
	}
	get startAt() {
		return this.getPropertyValue('startAt');
	}
	set startAt(startAt) {
		this.setPropertyValue('startAt', startAt);
	}
	get numberFormat() {
		return this.getPropertyValue('numberFormat');
	}
	set numberFormat(numberFormat) {
		this.setPropertyValue('numberFormat', numberFormat);
	}
	get restartLevel() {
		return this.getPropertyValue('restartLevel');
	}
	set restartLevel(restartLevel) {
		this.setPropertyValue('restartLevel', restartLevel);
	}
	getPropertyValue(property) {
		let propertyType = WUniqueFormat.getPropertyType(get(WListLevel, 'uniqueFormatType'), property);
		if (!isNullOrUndefined(this.uniqueListLevel) && this.uniqueListLevel.propertiesHash.containsKey(propertyType)) {
			return this.uniqueListLevel.propertiesHash.get(propertyType);
		}
		return WListLevel.getPropertyDefaultValue(property);
	}
	setPropertyValue(property, value) {
		if (isNullOrUndefined(value) || value === '') {
			value = WListLevel.getPropertyDefaultValue(property);
		}
		if (isNullOrUndefined(this.uniqueListLevel)) {
			this.initializeUniqueWListLevel(property, value);
		} else {
			let propertyType = WUniqueFormat.getPropertyType(this.uniqueListLevel.uniqueFormatType, property);
			if (
				this.uniqueListLevel.propertiesHash.containsKey(propertyType) &&
				// tslint:disable-next-line:max-line-length
				this.uniqueListLevel.propertiesHash.get(propertyType) === value
			) {
				//Do nothing, since no change in property value and return
				return;
			}
			// tslint:disable-next-line:max-line-length
			this.uniqueListLevel = get(WListLevel, 'uniqueListLevels').updateUniqueFormat(
				this.uniqueListLevel,
				property,
				value
			);
		}
	}
	initializeUniqueWListLevel(property, propValue) {
		let uniqueListLevelTemp = new Dictionary();
		this.addUniqueWListLevel('listLevelPattern', property, propValue, uniqueListLevelTemp);
		this.addUniqueWListLevel('startAt', property, propValue, uniqueListLevelTemp);
		this.addUniqueWListLevel('followCharacter', property, propValue, uniqueListLevelTemp);
		this.addUniqueWListLevel('numberFormat', property, propValue, uniqueListLevelTemp);
		this.addUniqueWListLevel('restartLevel', property, propValue, uniqueListLevelTemp);
		// tslint:disable-next-line:max-line-length
		this.uniqueListLevel = get(WListLevel, 'uniqueListLevels').addUniqueFormat(
			uniqueListLevelTemp,
			get(WListLevel, 'uniqueFormatType')
		);
	}
	// tslint:disable-next-line:max-line-length
	addUniqueWListLevel(property, modifiedProperty, propValue, uniqueCharFormatTemp) {
		let propertyType;
		propertyType = WUniqueFormat.getPropertyType(get(WListLevel, 'uniqueFormatType'), property);
		if (property === modifiedProperty) {
			uniqueCharFormatTemp.add(propertyType, propValue);
		} else {
			uniqueCharFormatTemp.add(propertyType, WListLevel.getPropertyDefaultValue(property));
		}
	}
	static getPropertyDefaultValue(property) {
		let value = undefined;
		switch (property) {
			case 'listLevelPattern':
				value = 'Arabic';
				break;
			case 'startAt':
				value = 0;
				break;
			case 'followCharacter':
				value = 'Tab';
				break;
			case 'numberFormat':
				value = '';
				break;
			case 'restartLevel':
				value = 0;
				break;
		}
		return value;
	}
	destroy() {
		if (!isNullOrUndefined(this.characterFormat)) {
			this.characterFormat.destroy();
		}
		if (!isNullOrUndefined(this.paragraphFormat)) {
			this.paragraphFormat.destroy();
		}
		if (!isNullOrUndefined(this.uniqueListLevel)) {
			get(WListLevel, 'uniqueListLevels').remove(this.uniqueListLevel);
		}
		this.uniqueListLevel = undefined;
		this.characterFormat = undefined;
		this.paragraphFormat = undefined;
	}
	// static clear() {
	// 	this.uniqueListLevels.clear();
	// }
}
// WListLevel.dotBullet = '\uf0b7';
// WListLevel.squareBullet = '\uf0a7'; //Symbol font \u25aa.
// WListLevel.arrowBullet = '\u27a4';
// WListLevel.circleBullet = '\uf06f' + '\u0020';
// WListLevel.uniqueListLevels = new WUniqueFormats();
// WListLevel.uniqueFormatType = 9;
const renderedLists = new Dictionary();

function createSfdt(sfdt) {
	const newSfdt = {...sfdt};
	// const renderedLists = new Dictionary();
	const clearList = () => renderedLists.clear();

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

	function updateListValues(list, listLevelNumber) {
		const abstractListId = get(list, 'abstractListId');
		if (!renderedLists.containsKey(getAbstractListById(abstractListId))) {
			let startVal = new Dictionary();

			renderedLists.add(getAbstractListById(abstractListId), startVal);
			let listLevel = getListLevel(list, listLevelNumber);
			for (let i = 0; i <= listLevelNumber; i++) {
				startVal.add(i, getListStartValue(i, list));
			}
		} else {
			// tslint:disable-next-line:max-line-length
			let levels = renderedLists.get(getAbstractListById(abstractListId));
			if (levels.containsKey(listLevelNumber)) {
				let startAt = levels.get(listLevelNumber);
				levels.set(listLevelNumber, startAt + 1);
				let levelNumber = listLevelNumber + 1;
				while (levelNumber < getAbstractListById(abstractListId).levels.length) {
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

	// TO-DO
	function getListTextListLevel(listLevel: WListLevel, listValue: number): string {
		switch (listLevel.listLevelPattern) {
			case 'UpRoman':
				return getAsRoman(listValue).toUpperCase();
			case 'LowRoman':
				return getAsRoman(listValue).toLowerCase();
			case 'UpLetter':
				return getAsLetter(listValue).toUpperCase();
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

	function getNumberFromList(block: BlockType, isAnchor) {
		const listFormat = getListFormatFromBlock(block);
		const list = getListById(listFormat.listId);
		const levelNumber = listFormat.listLevelNumber;
		const listLevel = getListLevel(list, listFormat.listLevelNumber);

		// listId is also -1 sometimes in sfdt, in such cases there is no list from id that we need although the block has listformat
		if (list) {
			updateListValues(list, levelNumber);
			if (isAnchor(block)) return getListText(list, levelNumber, listLevel);
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
