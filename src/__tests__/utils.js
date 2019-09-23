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

export const getFirstInlines = (sfdt) => sfdt.sections[0].blocks[0].inlines
