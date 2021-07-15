import loopCondition from '../loopCondition';
import populate from '../populate';
import toggleBookmark from '../toggleBookmark';
import loopingCondition from './fixtures/loopingCondition';
import loopingWithToggleCondition from './fixtures/loopingWithToggleCondition';

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
