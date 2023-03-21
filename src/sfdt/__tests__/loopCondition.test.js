import loopCondition from '../loopCondition';
import populate from '../populate';
import toggleBookmark from '../toggleBookmark';
import loopingCondition from './fixtures/loopingCondition';
import loopingMultipleLoops from './fixtures/loopingMultipleLoops';
import loopingWithToggleCondition from './fixtures/loopingWithToggleCondition';
import loopingMultipleLoopsForDiffBlock from './fixtures/loopingMultipleLoopsForDiffBlock';
import loopingWithLineBreak from './fixtures/loopingWithLineBreak';

const entities = {
	entity: [
		{
			name: 'entity1'
		},
		{
			name: 'entity2'
		}
	]
};

const dottedEntities = {
	'entity[0].name': 'entity1',
	'entity[1].name': 'entity2'
};

const multipleLoopDataForDiffBlock = {
	testing: {one: [{name: 'uiuiui', address: 'uiuiui999'}], two: [{nameOne: 'er', addressOne: 'er4'}]}
};

const multipleLoopData = {
	customer: {
		details: [
			{name: 'anki', address: 'pkr'},
			{name: 'shar', address: 'par'}
		]
	},
	seller_details: [
		{name1: 'tanki', address1: 'ktm'},
		{name1: 'tar', address1: 'ptm'}
	]
};

const lineBreakLoopData = {
	subsidiaries: {
		table: [
			{
				name: 'hjhj',
				dateOfIncorporation: '',
				registrationNumber: '5656',
				authorisedShareCapital: '',
				issuedShareCapital: '',
				mainShareholders: '',
				registeredAddress: '',
				directors: '',
				secretary: '',
				accountingReferenceDate: '',
				riskFinanceInformation: ''
			},
			{
				name: 'jk',
				dateOfIncorporation: '',
				registrationNumber: '89',
				authorisedShareCapital: '',
				issuedShareCapital: '',
				mainShareholders: '',
				registeredAddress: '',
				directors: '',
				secretary: '',
				accountingReferenceDate: '',
				riskFinanceInformation: ''
			}
		]
	}
};
describe('SFDT Loop Parser', function() {
	test('loop condition', function() {
		const loopSfdt = loopCondition(JSON.parse(JSON.stringify(loopingCondition)), entities);
		// check if loop bk is removed
		// console.log(loopSfdt);
		expect(loopSfdt.sections[0].blocks[0].inlines[0].bookmarkType).toBeUndefined();
		// change LOOP to entity.name with proper index
		expect(loopSfdt.sections[0].blocks[0].inlines[1].name).toEqual(
			loopSfdt.sections[0].blocks[0].inlines[1].name.replace('LOOP', 'entity[1].name')
		);
		// the block is looped 2 times as same as entity.length
		expect(loopSfdt.sections[0].blocks.length).toEqual(
			entities['entity'].length * loopingCondition.sections[0].blocks.length
		);
	});
	test('loop condition with populate', function() {
		const loopSfdt = loopCondition(JSON.parse(JSON.stringify(loopingCondition)), entities);
		const populateLoopSfdt = populate(dottedEntities, JSON.parse(JSON.stringify(loopSfdt)));
		// check if DATA:: bk is proper
		expect(populateLoopSfdt.sections[0].blocks[0].inlines[1].name.split('::')[2]).toEqual('entity[0].name');
		expect(populateLoopSfdt.sections[0].blocks[0].inlines[2].text).toEqual(dottedEntities['entity[0].name']);
		expect(populateLoopSfdt.sections[0].blocks[4].inlines[1].name.split('::')[2]).toEqual('entity[1].name');
		expect(populateLoopSfdt.sections[0].blocks[4].inlines[2].text).toEqual(dottedEntities['entity[1].name']);
	});
});

describe('SFDT Loop and condition Parser', function() {
	test('loop with toggle condition with populate', function() {
		const loopSfdt = loopCondition(JSON.parse(JSON.stringify(loopingWithToggleCondition)), entities);
		const afterToggleDonotShowOne = toggleBookmark(
			JSON.parse(JSON.stringify(loopSfdt)),
			'COND::showOneonOne',
			false,
			false
		);
		// in loopSfdt - there will be "for first loop entity1OneTwo"
		// after toggle - "for first loop entity1Two"
		const OneText = (obj) => obj.sections[0].blocks[0].inlines.filter((i) => i.text === 'One');
		expect(OneText(loopSfdt)[0].text).toEqual('One');
		expect(OneText(afterToggleDonotShowOne)[0]).toBeUndefined;
	});
});

describe('Multiple Loop and condition Parser', function() {
	test('multiple loop with toggle condition', function() {
		const loopSfdt = loopCondition(JSON.parse(JSON.stringify(loopingMultipleLoops)), multipleLoopData);
		// console.log(JSON.stringify(loopSfdt));
		expect(loopSfdt.sections[0].blocks.length).toBe(5);
	});
	test('multiple loop with different block bookmark', function() {
		const loopSfdt = loopCondition(
			JSON.parse(JSON.stringify(loopingMultipleLoopsForDiffBlock)),
			multipleLoopDataForDiffBlock
		);
		// console.log(JSON.stringify(loopSfdt));
		const blocklength = loopSfdt.sections[0].blocks.length;
		expect(loopSfdt.sections[0].blocks[blocklength - 2].inlines).toBeDefined;
		expect(loopSfdt.sections[0].blocks[blocklength - 2].inlines.length).toBe(0);
	});
});

describe('Loop with line break', function() {
	test('Loop with line break to include all blocks', function() {
		const loopSfdt = loopCondition(JSON.parse(JSON.stringify(loopingWithLineBreak)), lineBreakLoopData);
		const blocklengthAfter = loopSfdt.sections[0].blocks.length - 3;
		// in given example, there are 3 blocks not inside loop so we subtract 3 from length
		const blocklengthBefore = loopingWithLineBreak.sections[0].blocks.length - 3;
		expect(blocklengthAfter).toEqual(blocklengthBefore * 2);
	});
});
