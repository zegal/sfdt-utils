import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import uniqueId from 'lodash/uniqueId';

export const getSFDT = (inlines, extraBlocks) => {
	// console.log('inlines', inlines, blocks)

	let blocks = [];

	if (inlines) {
		blocks.push({inlines});
	}

	if (extraBlocks) {
		blocks = blocks.concat(extraBlocks);
	}

	const sfdt = {
		sections: [
			{
				blocks
			}
		]
	};

	return sfdt;
};

export const getBookmark = (id, prefix = 'DATA::') => {
	const name = id || '_bm_' + uniqueId();

	return [
		{
			bookmarkType: 0,
			name: `${prefix}${name}`
		},
		{
			fieldType: 0,
			hasFieldEnd: true, // Check to make sure the populate removes these fields
			text: 'REPLACE-ME-' + name
		},
		{
			bookmarkType: 1,
			name: `${prefix}${name}`
		}
	];
};

export const getInlines = () => {
	// console.log('extras', extras)

	const inlines = [
		{
			text: 'starting'
		},

		...getBookmark('K1'),
		...getBookmark('K2'),
		{
			text: 'ending'
		}
	];

	return inlines;
};

export const getInline = (
	sfdt,
	position = 0,
	blockPosition,
	option = {
		rowPosition: 0,
		cellPosition: 0,
		blockPositionInCell: 0
	}
) => {
	if (!blockPosition) {
		blockPosition = position;
	}

	const inlines = get(sfdt, `sections[${position}].blocks[${blockPosition}].inlines`);

	if (isArray(inlines)) {
		return get(sfdt, `sections[${position}].blocks[${blockPosition}].inlines`, []);
	}

	if (isObject(inlines)) {
		return get(
			inlines,
			`rows[${option.rowPosition}].cells[${option.cellPosition}].blocks[${option.blockPositionInCell}]`
		);
	}
	if (!inlines) {
		return get(
			sfdt,
			`sections[${position}].blocks[${blockPosition}].rows[${option.rowPosition}].cells[${option.cellPosition}].blocks[${option.blockPositionInCell}].inlines`
		);
	}
};

export const getFirstInlines = (sfdt) => getInline(sfdt, 0);
