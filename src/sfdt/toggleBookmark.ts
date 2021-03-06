/**
 * TOGGLEBOOKMARK WORKING PROCESS
 * for nested bookmark A wrapping [B,C] >> [A[B,C]]
 * If A=false >> all is removed regardless of child toggle option
 * If B is true with no value passed for A >> A is undefined from eval for toggle result which is true >> hence B is seen
 * Similar for C
 * For both B,C all A,B,C should be true
 * Algorithm:
 if(A){
   if(B) show B
   if (C) show C
   if (Both B and C) show both B and C
 } else (!A){
   remove all regardless of B and C
 }
 * So make sure the wrapper condition and child condition rule is made accordingly (they are mutually exclusive rule)
 */

/*
  processParagraph for deletion
  -- a paragraph is made up of inlines[]
  -- if a bookmark spans the first and last inline element, remove the entire paragraph
  -- if a bookmark spans witihn inline elements, just remove those elements inclusive
  -- if a bookmark spans multiple paragraphs, collapse
\*/
type inlineContext = {
	withinDeleteContext: boolean; // specifies inlines to be deleted
	withinBookmarkContext: boolean; // specifies inlines inside the currently processing bookmark
	firstTextInline: any;
	lastTextInline: any;
};

function processParagraph(paraBlock, condition, options: inlineContext, toggleOn, resultIsUndefined) {
	//console.log('processParagraph', condition, options, `inTable: ${inTable}`);
	let processedDelete = false;
	for (let i = 0; i < paraBlock.inlines.length; ) {
		const inline = paraBlock.inlines[i];
		if (inline.name == condition) {
			if (inline.bookmarkType == 0) {
				//console.log('FOUND START CONDITION', condition, paraBlock)
				if (!toggleOn) {
					options.withinDeleteContext = true;
					inline.markDelete = true;
				}
				options.withinBookmarkContext = true;
			} else if (inline.bookmarkType == 1) {
				//console.log('FOUND END CONDITION', condition, paraBlock)
				if (!resultIsUndefined) {
					// HC ADDED - Remove [] brackets

					if (!toggleOn) {
						delete options.withinDeleteContext;
						inline.markDelete = true;
					}
				}
				delete options.withinBookmarkContext;
				delete options.firstTextInline;
				delete options.lastTextInline;
			}
		} else {
			if (resultIsUndefined) {
				// HC ADDED
				if (!options.firstTextInline && inline.text && options.withinBookmarkContext) {
					options.firstTextInline = inline;
				}
				if (inline.text) options.lastTextInline = inline;
			}
			if (!toggleOn && !resultIsUndefined) {
				// HC ADDED "&& !resultIsUndefined"
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
	if (toggleOn && options.withinBookmarkContext) {
		// if toggling on, for now just unhiighlight the paraBlock....assume inlines are already taken care of
		if (!paraBlock.characterFormat) {
			paraBlock.characterFormat = {};
		}
		paraBlock.characterFormat.highlightColor = 'NoColor';

		paraBlock.inlines.forEach((inline) => {
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

	// there may be fieldType/end type matching value in the toggled removed data. We need to make sure to remove those inlines too
	// but for case of nested bookmark, we need to make sure the inline containing bookmark is not removed
	const inlines = block.inlines.filter((inline) => {
		return inline.text || inline.bookmarkType;
	});
	if (inlines.length == 0) {
		return true;
	}
}

function processBlock(blocks, i, condition, options, inTable, toggleOn, resultIsUndefined) {
	// console.log('processBlock', condition, options)
	const block = blocks[i];
	if (block.rows) {
		if (processTable(block, condition, options, inTable, toggleOn, resultIsUndefined)) {
			if (!resultIsUndefined) blocks.splice(i, 1);
			return true;
		}
	} else {
		if (processParagraph(block, condition, options, toggleOn, resultIsUndefined)) {
			// if inlines is empty, remove block
			if (checkInlinesEmpty(block)) {
				if (!resultIsUndefined) blocks.splice(i, 1);
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
function processTable(tableBlock, condition, options: inlineContext, inTable, toggleOn, resultIsUndefined) {
	//console.log('processTable', condition, options);
	let startDeleteRow, endDeleteRow;
	tableBlock.rows.forEach((row, i) => {
		row.cells.forEach((cell) => {
			for (let k = 0; k < cell.blocks.length; ) {
				if (!processBlock(cell.blocks, k, condition, options, true, toggleOn, resultIsUndefined)) {
					k++;
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

function processSection(section, condition, options = {}, toggleOn, resultIsUndefined) {
	//console.log('processing section for condition: ', condition)
	for (let i = 0; i < section.blocks.length; ) {
		if (!processBlock(section.blocks, i, condition, options, false, toggleOn, resultIsUndefined)) i++;
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
function toggleBookmark(sfdt, name, toggleOn = true, resultIsUndefined) {
	sfdt.sections.forEach((section) => processSection(section, name, {}, toggleOn, resultIsUndefined));
	return sfdt;
}

export default toggleBookmark;
