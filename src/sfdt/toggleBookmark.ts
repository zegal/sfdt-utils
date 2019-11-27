// DEPRECATED, use sfdt/blocksProcess
import process from './processInlines'
import {
	isMatchingBookmark,
	isBookmarkStart,
	isBookmarkEnd,
} from '../queryBookmark'
import Stack from '../stack'

const makeToggleOff = (inlines, name) => {
  const newInlines = []; // Should act as queue for getting new list of inlines
  const stackOfBookmarks = new Stack(); // will be used to find relationship of bookmarks
  let toggleOffAtIndex = null;

  inlines.forEach((inline, index) => {
    const nextInline = inlines[index + 1];
    const prevInline = inlines[index - 1];

    if (!(inline.fieldType || inline.hasFieldEnd)) {
      newInlines.push(inline);
    }

    if (inline.name && inline.name.split("::").includes("COND")) {
      const isSameBookmark = isMatchingBookmark(inline, name);
      if (isBookmarkStart(inline)) {
        stackOfBookmarks.push(inline);

        if (isSameBookmark) {
          if (toggleOffAtIndex === null) {
            toggleOffAtIndex = stackOfBookmarks.peekAt();
          } else if (stackOfBookmarks.peekAt() <= toggleOffAtIndex) {
            toggleOffAtIndex = stackOfBookmarks.peekAt();
          }
        }

        if (inline.hasFieldEnd || inline.fieldType === 2) {
          if (stackOfBookmarks.peekAt() <= toggleOffAtIndex) {
            toggleOffAtIndex = stackOfBookmarks.peekAt();
          }
        }

        if (
          nextInline &&
          nextInline.hasFieldEnd === undefined &&
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
          !prevInline.fieldType &&
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
    if (inline.hasFieldEnd || inline.fieldType) {
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
		const processInlines = (inlines) => {
			const newInlines: any[] = []

			let inMatchingBookmark = false

			inlines.forEach((inline) => {
				let defaultAdd = true

				if (isMatchingBookmark(inline, name)) {
					if (isBookmarkEnd(inline)) {
						inMatchingBookmark = false
					}

					if (isBookmarkStart(inline)) {
						inMatchingBookmark = true
					}
				}

				if (inMatchingBookmark) {
					// console.log('FOUND, DOING TOGGLE ON')
					if (inline.fieldType === 2) {
						defaultAdd = false
					}

					if (inline.hasFieldEnd === true) {
						defaultAdd = false
					}
				}

				if (defaultAdd) {
					newInlines.push(inline)
				}

			})

			return newInlines
		}

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
