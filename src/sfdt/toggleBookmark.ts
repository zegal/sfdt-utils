// DEPRECATED, use sfdt/blocksProcess
import process from './processInlines'
import {
	isMatchingBookmark,
	isBookmarkStart,
	isBookmarkEnd,
	isToggleObject,
	isToggleEnd,
	isToggleStart,
	isConditionalBookmark
} from '../queryBookmark'
import Stack from '../stack'

export const makeToggleOff = (inlines: any[], name: String) => {
  const newInlines: any[] = []; // Should act as queue for getting new list of inlines
  const stackOfBookmarks = new Stack(); // will be used to find relationship of bookmarks
  let toggleOffAtIndex = null; // will be used to track toggle off object index at bookmark block

  inlines.forEach((inline, index) => {
    const nextInline = inlines[index + 1];
    const prevInline = inlines[index - 1];

		// add in newInline is inline isn't toggle object
    if (!isToggleObject(inline)) {
      newInlines.push(inline);
    }

		// if we have conditional bookmark, then we need to find
		// either we can toggle off condition or not
    if (isConditionalBookmark(inline)) {
			const isSameBookmark = isMatchingBookmark(inline, name);

			// for every starting bookmark, we push in stack
			// and for every ending bookmar, we pop out from stack
			// this help us to find relation between bookmark block
			// if parent is toggle off then we don't have to toggle off any child
      if (isBookmarkStart(inline)) {
        stackOfBookmarks.push(inline);

        if (isSameBookmark && (toggleOffAtIndex === null || stackOfBookmarks.peekAt() <= toggleOffAtIndex)) {
          toggleOffAtIndex = stackOfBookmarks.peekAt();
				}

        if (isToggleObject(inline) && stackOfBookmarks.peekAt() <= toggleOffAtIndex) {
          toggleOffAtIndex = stackOfBookmarks.peekAt();
        }

        if (
          isSameBookmark &&
          nextInline &&
          !isToggleStart(nextInline) &&
          toggleOffAtIndex === stackOfBookmarks.peekAt()
        ) {
          newInlines.push({
            hasFieldEnd: true,
            fieldType: 0,
          });
        }
      } else if (isBookmarkEnd(inline)) {
        if (
          isSameBookmark &&
          prevInline &&
          !isToggleEnd(prevInline) &&
          stackOfBookmarks.peekAt() <= toggleOffAtIndex
        ) {
          const lastIndex = newInlines.findIndex((el, index) => {
            if (el.name === inline.name && el.bookmarkType === 1) {
              return index;
            }
            return -1;
          });
          newInlines.splice(lastIndex - 1, 0, {
            fieldType: 2,
          });

          if (stackOfBookmarks.peekAt() === toggleOffAtIndex) {
            toggleOffAtIndex = null;
          }
        }
        stackOfBookmarks.pop();
      }
    }

    // already available, need to decide to keep it or remove it
    if (isToggleObject(inline)) {
      if (toggleOffAtIndex === null) {
        newInlines.push(inline);
        toggleOffAtIndex = stackOfBookmarks.peekAt();
      } else if (stackOfBookmarks.peekAt() <= toggleOffAtIndex) {
        newInlines.push(inline);
      }
    }
  });

  return newInlines;
};

/**
* Toggle Bookmark - Hide or show the content of a bookmark
*
* @param {Object} SFDT - The SF SFDT JSON object
* @param {String} bookmarkName - Bookmark to toggle on or off
* @param {Boolean} toggleOn - True to show bookmark content, false to hide it
*
* @returns {Object} updatedSFDT
*/
const toggleBookmark = (sfdt: any, name: string, toggleOn = true) => {
	// console.log('toggleBookmark name', name)
	// console.log('toggleBookmark mode', toggleOn ? 'on' : 'off')

	if (toggleOn) {
    // toggle field on
    const processInlines = inlines => {
      const newInlines: any[] = []

      let inMatchingBookmark = false

      inlines.forEach((inline, index) => {
        let defaultAdd = true
        const nextInline = inlines[index + 1]
        const prevInline = inlines[index - 1]

        const isSameBookmark = isMatchingBookmark(inline, name)
        if (isSameBookmark) {
          if (isBookmarkEnd(inline)) {
            inMatchingBookmark = false;
          }

          if (isBookmarkStart(inline)) {
            inMatchingBookmark = true;
          }
        }

          // console.log("FOUND, DOING TOGGLE ON");
        if (inline.fieldType === 2 && isMatchingBookmark(nextInline, name)) {
          defaultAdd = false
        }

        if (
          inline.hasFieldEnd === true &&
          isMatchingBookmark(prevInline, name)
        ) {
          defaultAdd = false
        }

        if (defaultAdd) {
          newInlines.push(inline)
        }
      });

      return newInlines;
    };

		process(sfdt, processInlines)
	} else {
		// toggle field off
		// const processInlines = (inlines) => {
		// 	const newInlines: any[] = []

		// 	let inMatchingBookmark = false

		// 	inlines.forEach((inline, index) => {
		// 		const nextInline = inlines[index + 1]
		// 		const prevInline = inlines[index - 1]

		// 		if (isMatchingBookmark(inline, name)) {
		// 			// console.log('Matched:', name)
		// 			inMatchingBookmark = true
		// 		}

		// 		if (isBookmarkEnd(inline) && inMatchingBookmark) {
		// 			if (prevInline && (prevInline.fieldType === undefined)) {
		// 				// console.log('ADDING end')
		// 				newInlines.push({
		// 					fieldType: 2,
		// 				})
		// 			}

		// 			// make sure to only add once
		// 			// so we toggle this flag after anytime we match the end of the bookmark
		// 			inMatchingBookmark = false
		// 		}

		// 		newInlines.push(inline)

		// 		if (isBookmarkStart(inline) && inMatchingBookmark) {

		// 			// check to see if bookmark is already off
		// 			// and if so we dont need to add another 'off' flag
		// 			if (nextInline && (nextInline.fieldType === undefined)) {
		// 				// console.log('ADDING start')
		// 				newInlines.push({
		// 					'hasFieldEnd': true,

		// 					// these are added automatically by SF if they are not here
		// 					// so we add them in here manually now too so that tests can check for em
		// 					'characterFormat': {},
		// 					'fieldType': 0,
		// 				})
		// 			}

		// 		}
		// 	})

		// 	return newInlines
		// }
		const processInlines = inlines => {
			return makeToggleOff(inlines, name)
		}

		process(sfdt, processInlines)
	}

	return sfdt
}

export default toggleBookmark
