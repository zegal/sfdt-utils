import { isConditionalBookmark, isMatchingBookmark } from './../queryBookmark';
import get from 'lodash/get';
import first from 'lodash/first';
import last from 'lodash/last';

function canUseListCondition(block, name) {
  // condition for numbering condition

  // 1. if block don't have paragraphFormat.listFormat
  // represent block is not list
  const blockParagraphFormat = get(block, 'paragraphFormat');
  if (!get(blockParagraphFormat, 'listFormat')) {
    return false;
  }

  // 2. if block.inlines first element is conditional bookmark
  // represent block may have partials condition
  // condition don't start from the beginning of the line
  const inlines = get(block, 'inlines');
  const firstElementOfInlines = first(inlines);
  const lastElementOfInlines = last(inlines);
  if (
    isMatchingBookmark(firstElementOfInlines, name) &&
    isConditionalBookmark(firstElementOfInlines) &&
    isMatchingBookmark(lastElementOfInlines, name) &&
    isConditionalBookmark(lastElementOfInlines)
  ) {
    return true;
  }

  return false;
}

export default canUseListCondition;
