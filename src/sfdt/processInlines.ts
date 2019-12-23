import get from "lodash/get";
import filter from "lodash/filter"

// DEPRECATED, use sfdt/blocksProcess
export default (sfdt, callback, listConditionCallback = (arg) => true) => {
  if (!sfdt.sections) {
    console.warn('Missing: sfdt.sections', sfdt);
    return false;
  }

  sfdt.sections.forEach(section => {
    if (!section.blocks && !section.headersFooters) {
      return false;
    }

    const newBlocks = filter(section.blocks, (block) => {
      if (!block.inlines) {
				if (block.rows) {
					var rows = block.rows;
					rows.forEach(function(row: any) {
						if (row.hasOwnProperty('cells')) {
							var cells = row.cells;
							cells.forEach(function(cell: any) {
								if (cell.hasOwnProperty('blocks')) {
									var cellBlocks = cell.blocks;
									cellBlocks.forEach(function(cellBlock: any) {
										cellBlock.inlines = callback(cellBlock.inlines);
										return true;
									});
								}
							});
						}
					});
				}
        return true
      }

      const canAddBlock = listConditionCallback(block)
      if (!canAddBlock) {
        return false
      } else {
        block.inlines = callback(block.inlines)
        return true
      }
    })
    section.blocks = newBlocks

    if (get(section, 'headersFooters')) {
      for (let eachKey in section.headersFooters) {
        const child = section.headersFooters[eachKey];

        if (child.blocks) {
          child.blocks.forEach(block => {
            if (!block.inlines) {
              return false;
            }
            child.inlines = callback(block.inlines);
          });
        }
      }
    }
  });

  return true;
};
