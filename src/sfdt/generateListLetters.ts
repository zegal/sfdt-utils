/**
 * Gets list value prefixed with zero, if less than 10
 * @param listValue
 */
export const getAsLeadingZero = function(listValue: number): string {
	if (listValue < 10) {
		return '0' + listValue.toString();
	} else {
		return listValue.toString();
	}
};

/**
 * Generate roman number for the specified number.
 * @param number
 * @param magnitude
 * @param letter
 */
export const getAsRoman = () => {
	let value;
	function generateRomanNumber(number: number, magnitude: number, letter: string): string {
		let numberstring: string = '';
		while (number >= magnitude) {
			number -= magnitude;
			numberstring += letter;
			value = number;
		}
		return numberstring.toString();
	}
	function convertToRoman(number: number): string {
		let retval: string = '';
		value = number;
		retval += generateRomanNumber(value, 1000, 'M');
		retval += generateRomanNumber(value, 900, 'CM');
		retval += generateRomanNumber(value, 500, 'D');
		retval += generateRomanNumber(value, 400, 'CD');
		retval += generateRomanNumber(value, 100, 'C');
		retval += generateRomanNumber(value, 90, 'XC');
		retval += generateRomanNumber(value, 50, 'L');
		retval += generateRomanNumber(value, 40, 'XL');
		retval += generateRomanNumber(value, 10, 'X');
		retval += generateRomanNumber(value, 9, 'IX');
		retval += generateRomanNumber(value, 5, 'V');
		retval += generateRomanNumber(value, 4, 'IV');
		retval += generateRomanNumber(value, 1, 'I');
		return retval.toString();
	}
	return {convertToRoman};
};

/**
 * Gets the alphabet letter.
 * @param number
 */
export const getAsLetter = function(number: number): string {
	// if (number <= 0) {
	//     return '';
	// }
	let quotient: number = number / 26;
	let remainder: number = number % 26;
	if (remainder === 0) {
		//If number denotes the factor of 26, then reduce quotient by 1 and set remainder as 26.
		remainder = 26;
		quotient--;
	}
	//Index of A char in the ASCII table.
	let letter: string = String.fromCharCode(65 - 1 + remainder);
	let listValue: string = '';
	while (quotient >= 0) {
		listValue = listValue + letter.toString();
		quotient--;
	}
	return listValue;
};
