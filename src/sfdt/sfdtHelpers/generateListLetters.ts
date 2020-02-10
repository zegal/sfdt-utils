import {listLevel as ListLevelType} from '../../../types/list';
/**
 * Gets list value prefixed with zero, if less than 10
 * @param listValue
 */
const getAsLeadingZero = function(listValue: number): string {
	if (listValue < 10) {
		return '0' + listValue.toString();
	} else {
		return listValue.toString();
	}
};

/**
 * Generate roman number for the specified number.
 * @param number
 */
export function getAsRoman(number: number) {
	this.value = number;
	this.generateRomanNumber = function(magnitude: number, letter: string): string {
		let numberString = '';
		while (this.value >= magnitude) {
			this.value -= magnitude;
			numberString += letter;
		}
		return numberString.toString();
	};
	this.convertToRoman = function() {
		let romval = '';
		this.value = number;
		romval += this.generateRomanNumber(1000, 'M');
		romval += this.generateRomanNumber(900, 'CM');
		romval += this.generateRomanNumber(500, 'D');
		romval += this.generateRomanNumber(400, 'CD');
		romval += this.generateRomanNumber(100, 'C');
		romval += this.generateRomanNumber(90, 'XC');
		romval += this.generateRomanNumber(50, 'L');
		romval += this.generateRomanNumber(40, 'XL');
		romval += this.generateRomanNumber(10, 'X');
		romval += this.generateRomanNumber(9, 'IX');
		romval += this.generateRomanNumber(5, 'V');
		romval += this.generateRomanNumber(4, 'IV');
		romval += this.generateRomanNumber(1, 'I');
		return romval.toString();
	};
}
/**
 * Gets the alphabet letter.
 * @param number
 */
const getAsLetter = function(number: number): string {
	if (number <= 0) {
		return '';
	}
	let quotient: number = number / 26;
	let remainder: number = number % 26;
	if (remainder === 0) {
		//If number denotes the factor of 26, then reduce quotient by 1 and set remainder as 26.
		remainder = 26;
		quotient--;
	}
	//Index of A char in the ASCII table.
	const letter: string = String.fromCharCode(65 - 1 + remainder);
	let listValue = '';
	while (quotient >= 0) {
		listValue = listValue + letter.toString();
		quotient--;
	}
	return listValue;
};
/**
 * Convert the list number to correct levelPattern format
 * @param listLevel List level to get the pattern
 * @param listValue current list value
 */
export function getListTextListLevel(listLevel: ListLevelType, listValue: number): string {
	const getRoman: any = new getAsRoman(listValue);
	switch (listLevel.listLevelPattern) {
		case 'UpRoman':
			return getRoman.convertToRoman().toUpperCase();
		case 'LowRoman':
			return getRoman.convertToRoman().toLowerCase();
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
