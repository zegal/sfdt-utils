import get from 'lodash/get';
import {getSFDT, getInline, getInlines} from '../../__tests__/utils';
import tableInlines from './fixtures/tableInlines';

import replaceSfdtBookmarks from '../replaceSfdtBookmarks';

const data = {
	K1: '123'
};

const data1 = {
	K2: 'def'
};

const inlines = getInlines();
const sfdt = getSFDT(inlines);

// test for field data
describe('sfdt bookmark modify', function() {
	test('replaceSfdtBookmarks', function() {
		// calculate length of inlines array
		const originalLength = getInline(sfdt).length;

		// run function we are testing
		const result = replaceSfdtBookmarks(data, sfdt);
		const currentInlines = getInline(result);

		// make sure we get the same length of inlines, no addition, no subtraction
		expect(currentInlines.length).toEqual(originalLength);
		// check replacement went well
		expect(currentInlines[1].name).toEqual('DATA::bookmarkOne::123');
		expect(currentInlines[3].name).toEqual('DATA::bookmarkOne::123');
	});

	test('when data already exists', function() {
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
		const originalLength = getInline(sfdtWithData).length;
		sfdtWithData.sections[0].blocks[0].inlines[1].name = 'DATA::bookmark::123';

		const result = replaceSfdtBookmarks(data, sfdtWithData);
		// get results we want to check
		const currentInlines = getInline(result);

		// make sure we get the same length of inlines, no addition, no subtraction
		expect(currentInlines.length).toEqual(originalLength);
		// check replacement went well
		expect(currentInlines[1].name).toEqual('DATA::bookmark::123');
	});

	test('when id includes another id in its string', function() {
		// it should change only that bookmark whose processId matches the key of existingData
		const existingData = {
			abc: 'def'
		};
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
		const originalLength = getInline(sfdtWithData).length;
		sfdtWithData.sections[0].blocks[0].inlines[1].name = 'DATA::bookmark::abc';
		// case :- for id having its id including another id
		sfdtWithData.sections[0].blocks[0].inlines[4].name = 'DATA::bookmark::abcd';

		const result = replaceSfdtBookmarks(existingData, sfdtWithData);
		// get results we want to check
		const currentInlines = getInline(result);

		// make sure we get the same length of inlines, no addition, no subtraction
		expect(currentInlines.length).toEqual(originalLength);
		// check replacement went well
		expect(currentInlines[1].name).toEqual('DATA::bookmark::def');
		expect(currentInlines[4].name).toEqual('DATA::bookmark::abcd');
	});

	test('call function and replace bookmarks', function() {
		const originalLength = getInline(sfdt).length;
		const result = replaceSfdtBookmarks(data1, sfdt);

		const currentInlines = getInline(result);

		// make sure we get the same length of inlines, no addition, no subtraction
		expect(currentInlines.length).toEqual(originalLength);
		// check replacement went well and id in bookmarks is replaced
		expect(currentInlines[4].name).toEqual('DATA::bookmarkTwo::def');
		expect(currentInlines[6].name).toEqual('DATA::bookmarkTwo::def');
	});
});

// test for table data
describe('replace table bookmark', function() {
	test('replace bookmark of table field', function() {
		// get inlines for table i.e with rows and cells
		const sfdtWithInlines = getSFDT(tableInlines);
		const data = {
			'field.list.weeks': 'field.list.days'
		};
		// test our function
		const updatedSfdt = replaceSfdtBookmarks(data, sfdtWithInlines);

		// pass appropriate indexes for inlines we want to process
		const currentTableInlines = getInline(updatedSfdt, 0, 0, {
			rowPosition: 0,
			cellPosition: 2,
			blockPositionInCell: 0
		});

		expect(get(currentTableInlines, `inlines[0].name`)).toEqual(
			'DATA::d7cd08cb-8162-42c6-b5de-166087e62b0d::field.list.days'
		);
		expect(get(currentTableInlines, `inlines[2].name`)).toEqual(
			'DATA::d7cd08cb-8162-42c6-b5de-166087e62b0d::field.list.days'
		);
	});
});
