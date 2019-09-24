import get from 'lodash/get'
import uniqueId from 'lodash/uniqueId'

export const getSFDT = (inlines) => {
	console.log('inlines', inlines)

	const sfdt = {
		sections: [{
			blocks: [{
				inlines
			}]
		}]
	}

	return sfdt

}

export const getBookmark = () => {
	const name = '_bm_' + uniqueId()

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

	const inlines = [{
		text: 'starting',
	}, {
		bookmarkType: 0,
		name: 'DATA::K1',
	}, {
		text: 'REPLACE-ME',
	}, {
		bookmarkType: 1,
		name: 'DATA::K1',
	}, {
		text: 'ending',
	}]

	return inlines
}

export const getFirstInlines = (sfdt) => getInline(0)

export const getInline = (sfdt, position = 0) => {
	return get(sfdt, `sections[${position}].blocks[${position}].inlines`, [])
}
