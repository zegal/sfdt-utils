import {sfdt} from './../../types/sfdt.d';
import {isNull, isUndefined, get, find} from 'lodash';

// import Dictionary from '../dictionary';

export const isNullOrUndefined = (arg) => {
	return isNull(arg) || isUndefined(arg);
};
