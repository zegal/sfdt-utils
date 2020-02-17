/*
  processParagraph for deletion
  -- a paragraph is made up of inlines[]
  -- if a bookmark spans the first and last inline element, remove the entire paragraph
  -- if a bookmark spans witihn inline elements, just remove those elements inclusive
  -- if a bookmark spans multiple paragraphs, collapse
\*/
function processParagraph(paraBlock, condition, options = {}, toggleOn) {
	//console.log('processParagraph', condition, options, `inTable: ${inTable}`);
	let processedDelete = false;
	for (let i = 0; i < paraBlock.inlines.length;) {
		const inline = paraBlock.inlines[i];
		if (inline.name == condition) {
			if (inline.bookmarkType == 0) {
				//console.log('FOUND START CONDITION', condition, paraBlock)
				if (!toggleOn) {
					options.withinDeleteContext = true;
				}
				inline.markDelete = true;
				options.withinBookmarkContext = true;
			} else if (inline.bookmarkType == 1) {
				//console.log('FOUND END CONDITION', condition, paraBlock)
				if (!toggleOn) {
					delete options.withinDeleteContext;
				}
				inline.markDelete = true;
				delete options.withinBookmarkContext;
			}
		} else {
			if (!toggleOn) {
				if (options.withinDeleteContext) {
					inline.markDelete = true;
				}
			}
		}
		if (inline.markDelete) {
			paraBlock.inlines.splice(i, 1);
			processedDelete = true;
		} else {
			i++;
		}
	}

	if (toggleOn && options.withinBookmarkContext) { // if toggling on, for now just unhiighlight the paraBlock....assume inlines are already taken care of
		if (!paraBlock.characterFormat) {
			paraBlock.characterFormat = {};
		}
		paraBlock.characterFormat.highlightColor = 'NoColor';

		paraBlock.inlines.forEach(inline => {
			if (inline.characterFormat) inline.characterFormat.highlightColor = 'NoColor';
		});
		return;
	}

	return processedDelete || options.withinDeleteContext;
}

function checkInlinesEmpty(block) {
	if (block.inlines.length == 0) {
		return true;
	}

	const inlines = block.inlines.filter(inline => { return inline.text; });
	if (inlines.length == 0) {
		return true;
	}
}

function processBlock(blocks, i, condition, options, inTable, toggleOn) {
	// console.log('processBlock', condition, options)
	const block = blocks[i];
	if (block.rows) {
		if (processTable(block, condition, options, inTable, toggleOn)) {
			blocks.splice(i, 1);
			return true;
		}
	} else {
		if (processParagraph(block, condition, options, toggleOn)) {
			// if inlines is empty, remove block
			if (checkInlinesEmpty(block)) {
				blocks.splice(i, 1);
				return true;
			}
		}
	}
}

/*
  processTable for delete
  -- if a bookmark is within a cell, use processParagraph
  -- if a bookmark spans multiple cells
  --   if it spans the first and last cell in one row, then REMOVE THE ENTIRE ROW
  --   if it spans across cells in one row, then REMOVE THE ENTIRE ROW
  --   if it spans multiple rows, remove the rows affected.  ALL ROWS
*/
function processTable(tableBlock, condition, options = {}, inTable, toggleOn) {
	//console.log('processTable', condition, options);
	let startDeleteRow, endDeleteRow;
	tableBlock.rows.forEach((row, i) => {
		row.cells.forEach(cell => {
			for (let k = 0; k < cell.blocks.length;) {
				if (!processBlock(cell.blocks, k, condition, options, true, toggleOn)) {
					k++;
				} else {
					cell.blocks.splice(k, 1);
				}
			}

			if (options.withinDeleteContext) {
				if (!(startDeleteRow >= 0)) {
					startDeleteRow = i;
				}
			} else {
				if (startDeleteRow >= 0 && !(endDeleteRow >= 0)) {
					endDeleteRow = i;
				}
			}
		});
	});


	if (startDeleteRow >= 0) {
		if (!(endDeleteRow >= 0)) endDeleteRow = tableBlock.rows.length - 1;
		// console.log('table, deleting rows: ', startDeleteRow, endDeleteRow)
		tableBlock.rows.splice(startDeleteRow, endDeleteRow - startDeleteRow + 1);
	}

	if (tableBlock.rows.length == 0) {
		// if no more rows, return true to parent to have parent delete block
		return true;
	}

}

function processSection(section, condition, options = {}, toggleOn) {
	//console.log('processing section for condition: ', condition)
	for (let i = 0; i < section.blocks.length;) {
		if (!processBlock(section.blocks, i, condition, options, false, toggleOn)) i++;
	}
}

/**
 * Toggle Bookmark - Hide or show the content of a bookmark
 *
 * @param {Object} SFDT - The SF SFDT JSON object
 * @param {String} bookmarkName - Bookmark to toggle on or off
 * @param {Boolean} toggleOn - True to show bookmark content, false to hide it
 *
 * @returns {Object} updatedSFDT
 */
function toggleBookmark(sfdt, name, toggleOn = true) {
	sfdt.sections.forEach(section => processSection(section, name, {}, toggleOn));
	return sfdt;
}

export default toggleBookmark;
