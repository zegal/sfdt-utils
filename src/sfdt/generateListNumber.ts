import {getListTextListLevel} from './sfdtHelpers/generateListLetters';

const debug = false;

/**
 * Replaces the formats placeholder with proper list level formatted number
 * @param listTexts Array of formatted list number for each list level
 * @param formats complete number format containing whole levels
 */
function getListFormatListText(formattedListValues: Array<string>, formats: string): string {
	formattedListValues.forEach((value) => {
		// Replace the first occurance in each iteration
		formats = formats.replace(/\%\d/, value);
	});
	return formats;
}

export function getFullListLevelText(levels: Map<any, any>): string {
	let formattedListValues = [];
	let levelFormats = [];
	levels.forEach((level) => {
		const {format, number} = level;
		const {numberFormat} = format;
		// placeHolder is a collection of format placeHolder "%1" (without it's format- dot or braces), to know how many list levels does a numberFormat contain (%1.%2...)
		let placeHolder = numberFormat.match(/\%\d/g);
		// if matched, returns array else null. If null, skip
		if (placeHolder) {
			/*if multiple placeHolders, need to remove the prev calculated level
			 * Case: %1.%2....: the child has the complete format needed. So, remove the calculated parent level format
			 */

			levelFormats.splice(levelFormats.length - 1, placeHolder.length - 1);
			levelFormats.push(numberFormat);

			formattedListValues.push(getListTextListLevel(format, number));
		} else {
			// else nothing
			debug && console.log('numberFormat is not in expected format', numberFormat);
		}
	});
	return getListFormatListText(formattedListValues, levelFormats.join(''));
}
