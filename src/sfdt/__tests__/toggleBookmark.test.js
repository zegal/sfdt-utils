import get from 'lodash/get';
import first from 'lodash/first';

import toggleBookmark from '../toggleBookmark';

// import list2Inlines from './fixtures/list-2';
import nestedConditionListWithParentOnOneChildOff from './fixtures/nestedConditionListWithOneChildToggleOff';
import nestedConditionWithParentOffOneChildOff from './fixtures/nestedConditonWithParentOff';
import bookmarkStartEndingInDifferentInline from './fixtures/bookmarkEndingInMultipleInlineSfdt';
import newlineSpaceInsideCondition from './fixtures/newlineSpaceInsideCondition';
import listWithConditionSfdt from './fixtures/listWithConditionSfdt';
import listWithConditionSfdt2 from './fixtures/listWithConditionSfdt-2';
import tableConditionSfdt from './fixtures/tableConditionSfdt';
import deedSeparationSfdt from './fixtures/deedSeparationSFDT';
import deedSeparationSfdt2 from './fixtures/deedSeparationSFDT-2';

import {getSFDT, getInlines, getFirstInlines, getBookmark, getInline} from '../../__tests__/utils';

const inlines = getInlines();

const bookmarkType = 'COND';
const uuid = 'K1';
const name = `${bookmarkType}::${uuid}`;

describe('toggleBookmark', function() {
	describe('Simple', function() {
		test('Toggle off', function() {
			const sfdt = getSFDT(inlines.concat(getBookmark(uuid, 'COND::')));
			const ourInlinesBeforeToggle = getFirstInlines(sfdt);
			expect(ourInlinesBeforeToggle.length).toEqual(11);

			const result = toggleBookmark(sfdt, name, false);

			const ourInlinesAfterToggle = getFirstInlines(result);

			expect(ourInlinesAfterToggle.length).toEqual(8);
		});

		test('Toggle on', function() {
			const sfdt = getSFDT(inlines.concat(getBookmark(uuid, 'COND::')));
			const toggledSfdt = toggleBookmark(sfdt, name, false);

			const initialInlines = getFirstInlines(toggledSfdt);
			expect(initialInlines.length).toEqual(8);

			const result = toggleBookmark(sfdt, name, true);

			const ourInlines = getFirstInlines(result);

			expect(ourInlines.length).toEqual(8);
		});
	});

	describe('Nested', function() {
		test('Toggle parent off', function() {
			const newSfdt = JSON.parse(JSON.stringify(nestedConditionListWithParentOnOneChildOff));
			const nestedBookmarkSfdt = getSFDT(false, newSfdt);
			const initialInlines = getFirstInlines(nestedBookmarkSfdt);
			const INITIAL_INLINE_LENGTH = 10;
			expect(initialInlines.length).toEqual(INITIAL_INLINE_LENGTH);

			const toggledOff = toggleBookmark(nestedBookmarkSfdt, 'COND::dafe554d-08b5-463f-a40c-cf5e260be606', false);
			expect(first(get(toggledOff, 'sections')).blocks.length).toBe(0);
		});

		test('Toggle parent on', function() {
			const newSfdt = JSON.parse(JSON.stringify(nestedConditionWithParentOffOneChildOff));
			const nestedBookmarkSfdt = getSFDT(false, newSfdt);
			const initialInlines = getFirstInlines(nestedBookmarkSfdt);
			const INITIAL_INLINE_LENGTH = 10;
			expect(initialInlines.length).toEqual(INITIAL_INLINE_LENGTH);
			expect(initialInlines[1].hasFieldEnd).toBeTruthy();
			expect(initialInlines[8].fieldType).toBe(1);

			const toggledOn = toggleBookmark(nestedBookmarkSfdt, 'COND::dafe554d-08b5-463f-a40c-cf5e260be606');
			const toggledOnInlines = getFirstInlines(toggledOn);
			expect(toggledOnInlines.length).toEqual(10);
			//expect(toggledOnInlines[1].hasFieldEnd).toBeUndefined();
			//expect(toggledOnInlines[6].fieldType).toBeUndefined();
		});

		/** parent should only toggle off in this case */
		test('Toggle parent off along with one child off', () => {
			const newSfdt = JSON.parse(JSON.stringify(nestedConditionListWithParentOnOneChildOff));
			const nestedBookmarkSfdt = getSFDT(false, newSfdt);
			const initialInlines = getFirstInlines(nestedBookmarkSfdt);

			expect(initialInlines.length).toEqual(10);

			const toggledOff = toggleBookmark(nestedBookmarkSfdt, 'COND::dafe554d-08b5-463f-a40c-cf5e260be606', false);
			expect(first(get(toggledOff, 'sections')).blocks.length).toBe(0);
		});
	});

	/**
	 * Toggling same sfdt 2 time, checking toggle object is inserted 2 times or not
	 */
	describe('Nested + Toggle off x2', function() {
		test('Toggle off x2', function() {
			const nestedBookmarkSfdt = getSFDT(false, nestedConditionListWithParentOnOneChildOff);
			const initialInlines = getFirstInlines(nestedBookmarkSfdt);
			expect(initialInlines.length).toEqual(10);

			const toggledOff = toggleBookmark(nestedBookmarkSfdt, 'COND::dafe554d-08b5-463f-a40c-cf5e260be606', false);
			expect(get(toggledOff, 'sections[0].blocks').length).toBe(0);
		});
	});

	describe('Bookmark start and ending in different inlines', function() {
		test('Toggle on', function() {
			const firstInline = getInline(bookmarkStartEndingInDifferentInline, 0);
			const lastInline = getInline(bookmarkStartEndingInDifferentInline, 0, 2);

			expect(firstInline[2].hasFieldEnd).toBe(true);
			expect(lastInline[1].fieldType).toBe(1);

			const newSfdt = JSON.parse(JSON.stringify(bookmarkStartEndingInDifferentInline));
			const toggleOff = toggleBookmark(
				newSfdt,
				'COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4',
				true
			);
			//const firstInlineAfterToggle = getInline(toggleOff, 0);
			//const lastInlineAfterToggle = getInline(toggleOff, 0, 2);

			//expect(firstInlineAfterToggle[2].hasFieldEnd).toBeUndefined();
			//expect(lastInlineAfterToggle[1].fieldType).toBeUndefined();
		});

		test('Toggle off', function() {
			let newSfdt = JSON.parse(JSON.stringify(bookmarkStartEndingInDifferentInline));
			const toggleOn = toggleBookmark(
				newSfdt,
				'COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4',
				true
			);
			const firstInlineAfterToggle = getInline(toggleOn, 0);
			const lastInlineAfterToggle = getInline(toggleOn, 0, 2);

			//expect(firstInlineAfterToggle[2].hasFieldEnd).toBeUndefined();
			//expect(lastInlineAfterToggle[1].fieldType).toBeUndefined();

			newSfdt = JSON.parse(JSON.stringify(bookmarkStartEndingInDifferentInline));
			const toggleOff = toggleBookmark(
				newSfdt,
				'COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4',
				false
			);
			const firstInlineAfterToggleOn = getInline(toggleOff, 0);
			expect(firstInlineAfterToggleOn.length).toBe(1);
		});
	});

	describe('Newline space inside hidden condition', function() {
		test('toggle off should delete block (empty included) inside the condition', () => {
			const toggledOffSFDT = toggleBookmark(
				newlineSpaceInsideCondition,
				'COND::9e7d0dc1-b9ed-4baa-9399-a4c4c9be96d4',
				false
			);
			const blocksLengthAfterToggleOff = toggledOffSFDT.sections[0].blocks.length;
			const lastInlineAfterToggleOff = getInline(toggledOffSFDT, 0, blocksLengthAfterToggleOff - 1);

			const secondInlineAfterToggleOff = getInline(toggledOffSFDT, 0, 1);
			// Empty inline outside condition should be as it is
			expect(lastInlineAfterToggleOff).toEqual([]);
			expect(get(secondInlineAfterToggleOff[0], 'text')).toEqual('End of Paragraph');
		});
	});
	describe('Number in List', () => {
		test('toggle off => should delete block', () => {
			const toggledOff = toggleBookmark(
				listWithConditionSfdt,
				'COND::3ecfa0c1-0eb3-4463-bdb8-75b8c5f0e613',
				false
			);

			const inlineAfterToggleOff = get(toggledOff, 'sections[0].blocks[5].inlines[0]');
			expect(get(inlineAfterToggleOff, 'text')).toEqual('Three');
		});
	});
});

describe('toggleBookmark', () => {
	it('toggle off', () => {
		const toggledOff = toggleBookmark(listWithConditionSfdt2, 'COND::firstofOne', false);

		const inlineAfterToggleOff = getInline(toggledOff, 0);

		expect(get(inlineAfterToggleOff, '[0]').name).not.toEqual('COND:firstofOne');
		expect(get(inlineAfterToggleOff, '[1].text')).not.toEqual('One');
	});

	it('toggle off inside list inline', () => {
		const toggledOff = toggleBookmark(listWithConditionSfdt2, 'COND::fcd74c0d-d1e4-4337-baa5-2b2c5abb120b', false);

		const inlineAfterToggleOff = getInline(toggledOff, 0, 2);

		expect(get(inlineAfterToggleOff, '[0].text')).toEqual(' Text');
	});

	it('toggle on inside table', () => {
		const toggleOnTable = toggleBookmark(tableConditionSfdt, 'COND::32ef2517-b7e0-4066-baec-785c02e09aaf', true);

		const inlineAfterToggleOn = getInline(toggleOnTable, 0, 5, {
			rowPosition: 1,
			cellPosition: 1,
			blockPositionInCell: 0
		});
		expect(get(inlineAfterToggleOn, '[0]').name).toEqual('COND::32ef2517-b7e0-4066-baec-785c02e09aaf');
		expect(get(inlineAfterToggleOn, '[1]').text).toEqual('test2');
	});

	it('toggle off inside table', () => {
		const toggleOffInsideTable = toggleBookmark(
			tableConditionSfdt,
			'COND::32ef2517-b7e0-4066-baec-785c02e09aaf',
			false
		);

		const inlineAfterToggleOn = getInline(toggleOffInsideTable, 0, 5, {
			rowPosition: 1,
			cellPosition: 1,
			blockPositionInCell: 0
		});
		expect(inlineAfterToggleOn).toEqual(expect.arrayContaining([]));
	});

	it('toggle off in deed separation list', () => {
		let toggledOff = toggleBookmark(deedSeparationSfdt, 'COND::7cb6036d-44bd-4d3f-ae6d-7e77f165c77c', false);
		toggledOff = toggleBookmark(toggledOff, 'COND::5079cf1c-41b5-4f27-8f88-bcb91327aaf6', false);

		expect(get(toggledOff, 'sections[0].blocks').length).toBe(0);
	});

	it('toggle off deed separation-2', () => {
		const toggledOff = toggleBookmark(deedSeparationSfdt2, 'COND::cad2523d-7c56-498d-8ad7-4cc89c82bd5f', false);

		const firstElementOfBlocks = get(toggledOff, 'sections[0].blocks');
		expect(firstElementOfBlocks.length).toBe(1);
		expect(get(firstElementOfBlocks, '[0].inlines[0].text')).toEqual('Outside of Condition');
	});
});
