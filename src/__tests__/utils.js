import get from 'lodash/get'
import uniqueId from 'lodash/uniqueId'

export const getSFDT = (inlines, extraBlocks) => {
	// console.log('inlines', inlines, blocks)

	let blocks = []

	if (inlines) {
		blocks.push({inlines})
	}

	if (extraBlocks) {
		blocks = blocks.concat(extraBlocks)
	}

	const sfdt = {
		sections: [{
			blocks
		}]
	}

	return sfdt

}

export const getBookmark = (id) => {
	const name = id || '_bm_' + uniqueId()

	return [{
		bookmarkType: 0,
		name: 'DATA::' + name,
	}, {
		text: 'REPLACE-ME-' + name,
	}, {
		bookmarkType: 1,
		name: 'DATA::' + name,
	}]
}

export const getInlines = () => {
	// console.log('extras', extras)

	const inlines = [
		{
			text: 'starting',
		},

		...getBookmark('K1'),

		{
			text: 'ending',
		},
	]

	return inlines
}

export const getFirstInlines = (sfdt) => getInline(sfdt, 0)

export const getInline = (sfdt, position = 0) => {
	return get(sfdt, `sections[${position}].blocks[${position}].inlines`, [])
}
