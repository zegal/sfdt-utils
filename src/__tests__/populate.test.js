import populate from '../populate'
import get from 'lodash/get'

const data = {
	'DATA::K1': '123'
}

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

const sfdt = {
	sections: [{
		blocks: [{
			inlines
		}]
	}]
}

const getInlines = (sfdt, position = 0) => {
	return get(sfdt, `sections[${position}].blocks[${position}].inlines`, [])
}

describe('SFDT Parser', function() {
	test('populate', function() {
		const orignalLength = getInlines(sfdt).length

		// run function we are testing
		const result = populate(data, sfdt)
		// console.log('result', result)

		// get results we want to look at
		const currentInlines = getInlines(result)
		// console.log('result', currentInlines)

		// make sure we get the same amount of data back, no additions.
		expect(currentInlines.length).toEqual(orignalLength)

		// check replacement went well
		expect(currentInlines[2].text).toEqual('123 ')
	})

	test('populate when data already exists', function() {
		// run function we are testing
		const sfdtWithData = {
			sections: [{
				blocks: [{
					inlines: [...inlines]
				}]
			}]
		}

		const orignalLength = getInlines(sfdtWithData).length
		sfdtWithData.sections[0].blocks[0].inlines[2].text = '123'

		const result = populate(data, sfdtWithData)
		// console.log('result', result)

		// get results we want to look at
		const currentInlines = getInlines(result)
		// console.log('result', currentInlines)

		// make sure we get the same amount of data back, no additions.
		expect(currentInlines.length).toEqual(orignalLength)

		// check replacement went well
		expect(currentInlines[2].text).toEqual('123 ')
	})
})
