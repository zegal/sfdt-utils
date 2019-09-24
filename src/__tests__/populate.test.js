import {
	getSFDT,
	getInline,
	getInlines,
} from './utils'

import populate from '../populate'

const data = {
	'DATA::K1': '123'
}

const inlines = getInlines()

const sfdt = getSFDT(inlines)

describe('SFDT Parser', function() {
	test('populate', function() {
		const orignalLength = getInline(sfdt).length

		// run function we are testing
		const result = populate(data, sfdt)
		// console.log('result', result)

		// get results we want to look at
		const currentInlines = getInline(result)
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

		const orignalLength = getInline(sfdtWithData).length
		sfdtWithData.sections[0].blocks[0].inlines[2].text = '123'

		const result = populate(data, sfdtWithData)
		// console.log('result', result)

		// get results we want to look at
		const currentInlines = getInline(result)
		// console.log('result', currentInlines)

		// make sure we get the same amount of data back, no additions.
		expect(currentInlines.length).toEqual(orignalLength)

		// check replacement went well
		expect(currentInlines[2].text).toEqual('123 ')
	})
})
