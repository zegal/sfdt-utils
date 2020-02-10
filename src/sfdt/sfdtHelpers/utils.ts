import {isNull, isUndefined} from 'lodash';

export const isNullOrUndefined = (arg) => {
	return isNull(arg) || isUndefined(arg);
};
export const isInvalid = (arg) => {
	const remove = [undefined, NaN, null, ''];
	return remove.includes(arg);
};
