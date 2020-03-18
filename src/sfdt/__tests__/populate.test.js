import get from 'lodash/get';
import {getSFDT, getInline, getInlines} from '../../__tests__/utils';
import tableInlines from './fixtures/tableInlines';
import sfdtWithCrossRef from './fixtures/crossreference-fromStyleName';
import emptyBlockSection from './fixtures/emptyBlockSection';
import getCrossRefData from '../crossReference';
import populate from '../populate';
import toggleBookmark from '../toggleBookmark';

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

	test('Text with line separator is split in multiple lines', () => {
		const data = {
			K1: 'Line 1\nLine 2\nLine 3'
		};
		const originalInlines = getInline(sfdt);

		const updatedSfdt = populate(data, {...sfdt});

		const currentInlines = getInline(updatedSfdt);

		//we should have `Line 1` injected in a present inline, line 2 and 3 are new inlines
		// and 2 inlines with vertival tab as separator => size + 4
		expect(currentInlines.length).toEqual(originalInlines.length + 4);

		const targetInlines = [
			{text: 'starting'},
			{bookmarkType: 0, name: 'DATA::K1'},
			{text: 'Line 1'},
			{text: '\u000b'},
			{text: 'Line 2'},
			{text: '\u000b'},
			{text: 'Line 3'},
			{bookmarkType: 1, name: 'DATA::K1'},
			{bookmarkType: 0, name: 'DATA::K2'},
			{text: 'false'},
			{bookmarkType: 1, name: 'DATA::K2'},
			{text: 'ending'}
		];

		expect(currentInlines).toEqual(targetInlines);
	});
});

describe('Remove empty section from sfdt', () => {
	it('Checks the sfdt is correct or not', () => {
		const originalSfdt = emptyBlockSection;
		expect(get(originalSfdt, 'sections').length).toBe(3);
	});

	it('Removes whole section if block is empty', () => {
		const name = 'COND::e2fb3aa8-6f6f-45da-bae5-b0c2d8989686';
		const sectionLength = emptyBlockSection.sections.length;
		const updatedSfdt = toggleBookmark(emptyBlockSection, name, false);
		const finalSfdt = populate({test: 'test'}, updatedSfdt);
		expect(get(finalSfdt, 'sections').length).toBe(sectionLength - 1);
	});
});
