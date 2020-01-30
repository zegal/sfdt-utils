import {isNullOrUndefined} from './sfdt/listHelpers';

class Dictionary {
	keysInternal: any[];
	valuesInternal: any[];

	constructor() {
		this.keysInternal = [];
		this.valuesInternal = [];
	}
	/**
	 * @private
	 */
	length() {
		return this.keysInternal.length;
	}
	/**
	 * @private
	 */
	keys() {
		return this.keysInternal;
	}
	/**
	 * @private
	 */
	add(key, value) {
		if (isNullOrUndefined(key)) {
			throw new ReferenceError('Provided key or value is not valid.');
		}
		const index = this.keysInternal.indexOf(key);
		// if (index < 0 || index > this.keysInternal.length - 1) {
		if (index < 0) {
			this.keysInternal.push(key);
			this.valuesInternal.push(value);
		}
		return 1;
		// else {
		//     throw new RangeError('An item with the same key has already been added.');
		// }
	}
	/**
	 * @private
	 */
	get(key) {
		if (isNullOrUndefined(key)) {
			throw new ReferenceError('Provided key is not valid.');
		}
		const index = this.keysInternal.indexOf(key);
		if (index < 0 || index > this.keysInternal.length - 1) {
			throw new RangeError('No item with the specified key has been added.');
		} else {
			return this.valuesInternal[index];
		}
	}
	/**
	 * @private
	 */
	set(key, value) {
		if (isNullOrUndefined(key)) {
			throw new ReferenceError('Provided key is not valid.');
		}
		const index = this.keysInternal.indexOf(key);
		if (index < 0 || index > this.keysInternal.length - 1) {
			throw new RangeError('No item with the specified key has been added.');
		} else {
			this.valuesInternal[index] = value;
		}
	}
	/**
	 * @private
	 */
	remove(key) {
		if (isNullOrUndefined(key)) {
			throw new ReferenceError('Provided key is not valid.');
		}
		const index = this.keysInternal.indexOf(key);
		if (index < 0 || index > this.keysInternal.length - 1) {
			throw new RangeError('No item with the specified key has been added.');
		} else {
			this.keysInternal.splice(index, 1);
			this.valuesInternal.splice(index, 1);
			return true;
		}
	}
	/**
	 * @private
	 */
	containsKey(key) {
		if (isNullOrUndefined(key)) {
			throw new ReferenceError('Provided key is not valid.');
		}
		const index = this.keysInternal.indexOf(key);
		if (index < 0 || index > this.keysInternal.length - 1) {
			return false;
		}
		return true;
	}
	/**
	 * @private
	 */
	clear() {
		this.keysInternal = [];
		this.valuesInternal = [];
	}
	/**
	 * @private
	 */
	destroy() {
		this.clear();
		this.keysInternal = undefined;
		this.valuesInternal = undefined;
	}
}

export default Dictionary;
