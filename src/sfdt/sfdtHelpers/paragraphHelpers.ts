import get from 'lodash/get';
import merge from 'lodash/merge';
import {baseStyles} from './sfdtConstants';
import {block as BlockType, style as StyleType, paragraphFormat as ParagraphFormatType} from '../../../types/sfdt';
/**
 * Returns style object with its name (unique) property as given name. If not found, returns undefined
 * @param name style name
 * @param styles styles array from sfdt
 */
export const getStyleFromName = (name: string, styles: StyleType[] = []) => {
	return styles.filter((style) => style.name === name)[0];
};

/**
 * Returns the updated paragraphFormat from styles format
 * @param name style name
 * @param stylesArray sfdt styles array
 * @param currentParaFormat running paraFormat in each iteration updated with the given style paraFormat
 */
const parseParaStyle = (name: string, stylesArray: StyleType[], currentParaFormat: ParagraphFormatType) => {
	let paraStyle = getStyleFromName(name, stylesArray);
	// Only for paragraph style type
	if (paraStyle.type !== baseStyles.paragraph.type) {
		return {};
	}

	let paraFormatFromStyle = get(paraStyle, 'paragraphFormat');
	// Update the paraFormat value with the format from style; currentParaFormat is the main priority source
	currentParaFormat = merge({}, paraFormatFromStyle, currentParaFormat);

	// Base condition to stop recursion
	if (paraStyle.name === baseStyles.paragraph.name) {
		return currentParaFormat;
	}

	return parseParaStyle(paraStyle.basedOn, stylesArray, currentParaFormat);
};

/**
 * Returns whole paragraphFormat object, with updated data from it's respective style
 * @param paraBlock paragraphBlock
 * @param stylesArray
 */
export const getCompleteParaFormat = (paraBlock: BlockType, stylesArray: StyleType[]) => {
	const paraFormat = get(paraBlock, 'paragraphFormat');
	const styleName = get(paraFormat, 'styleName');
	// 1. Check for styleName
	if (!styleName) {
		return paraFormat;
	}
	// 2. Update the paragraphFormat from the styles
	const paraFormatFromStyle = parseParaStyle(paraFormat.styleName, stylesArray, {});

	const allParaFormat = merge({}, paraFormat, paraFormatFromStyle);
	// Invalid case: when the listFormat.listId is invalid(-1) then we don't take from the updated one. We just leave it as it is(as that is not a list at all, don't update from the style)

	return allParaFormat;
};
