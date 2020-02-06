import get from 'lodash/get';
import {getSFDT, getInline, getInlines} from '../../__tests__/utils';
import tableInlines from './fixtures/tableInlines';
import sfdtWithCrossRef from './fixtures/crossreference-fromStyleName';
import getCrossRefData from '../crossReference';
import populate from '../populate';

const data = {
	K1: '123'
};
const data1 = {
	K1: -12,
	K2: false
};

const inlines = getInlines();

const sfdt = getSFDT(inlines);

describe('SFDT Parser', function() {
	test('populate', function() {
		const orignalLength = getInline(sfdt).length;

		// run function we are testing
		const result = populate(data, sfdt);
		// console.log('result', result)

		// get results we want to look at
		const currentInlines = getInline(result);
		// console.log('result', currentInlines)

		// make sure we get the same amount of data back, no additions.
		expect(currentInlines.length).toEqual(orignalLength);

		// check replacement went well
		expect(currentInlines[2].text).toEqual('123');
	});

	test('populate when data already exists', function() {
		// run function we are testing
		const sfdtWithData = {
			sections: [
				{
					blocks: [
						{
							inlines: [...inlines]
						}
					]
				}
			]
		};

		const orignalLength = getInline(sfdtWithData).length;
		sfdtWithData.sections[0].blocks[0].inlines[2].text = '123';

		const result = populate(data, sfdtWithData);
		// console.log('result', result)

		// get results we want to look at
		const currentInlines = getInline(result);
		// console.log('result', currentInlines)

		// make sure we get the same amount of data back, no additions.
		expect(currentInlines.length).toEqual(orignalLength);

		// check replacement went well
		expect(currentInlines[2].text).toEqual('123');
	});

	test('populate and inject string data to stop breaking sfdt', function() {
		const orignalLength = getInline(sfdt).length;
		const result = populate(data1, sfdt);

		const currentInlines = getInline(result);

		// make sure we get the same amount of data back, no additions.
		expect(currentInlines.length).toEqual(orignalLength);

		// check replacement went well and data is converted to string
		expect(currentInlines[2].text).toEqual('-12');
		expect(currentInlines[5].text).toEqual('false');
	});
});

describe('Populate', () => {
	test('inject data in table', () => {
		const sfdtWithInlines = getSFDT(tableInlines);
		const data = {
			'field.list.weeks': 'Monday'
		};

		const updatedSfdt = populate(data, sfdtWithInlines);

		const updatedBlockAfterPopulate = getInline(updatedSfdt, 0, 0, {
			rowPosition: 0,
			cellPosition: 2,
			blockPositionInCell: 0
		});
		expect(get(updatedBlockAfterPopulate, 'inlines[1].text')).toEqual('Monday');
	});
	test('update cross ref data', () => {
		const crossRefSfdt = sfdtWithCrossRef;
		const data = getCrossRefData(crossRefSfdt);
		const updatedSfdt = populate(data, crossRefSfdt);
		expect(updatedSfdt.sections[0].blocks[43].inlines[15].text).toEqual('4.1(a)');
		expect(updatedSfdt.sections[0].blocks[41].inlines[15].text).toEqual('4.2');
	});
});
