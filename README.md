# sfdt-utils - Util functions for working with SFDT objects

Working with SFDT is hard and the JS API from SF provides us only the basics to do that.

Here we have compiled a group of utils so that we can easily do some more advanced things.

There are two groups of functions:

1. Operations on SFDT objects directly, eg: toggleBookmark
2. Batched calls to the document editor API, eg: hasBookmark

## Usage:

Eg:

```
import toggleBookmark from 'sfdt-utils/toggleBookmark'
```

## API

### bookmarkAction

```
/**
* @param {String}  -
*/

bookmarkAction()
```

### bookmarkHighlight

```
/**
* @param {String}  -
*/

bookmarkHighlight()
```

### getCurrentSelection

```
/**
* @param {String}  -
*/

getCurrentSelection()
```

### getSFDTjson

```
/**
* @param {String}  -
*/

getSFDTjson()
```

### getSFDTstring

```
/**
* @param {String}  -
*/

getSFDTstring()
```

### Has Bookmark - Detect if a bookmark exists

```
/**
* @param {String} name - Bookmark name
* @param {Object} documentEditor - Instance of the SF document editor
*
* @returns {Boolean} - True if the bookmark exists in the editor
*/

hasBookmark('my-bookmark-name', documentEditor)
```

### insertBookmark
### populate
### processInlines
### queryBookmark
### showCaret

### Toggle Bookmark - Hide or show the content of a bookmark

```
/**
* @param {Object} SFDT - The SF SFDT JSON object
* @param {String} bookmarkName - Bookmark to toggle on or off
* @param {Boolean} toggleOn - True to show bookmark content, false to hide it
*
* @returns {Object} updatedSFDT
*/

const updatedSFDT = toggleBookmark(SFDT, 'my-bookmark-name', true)

```
### unselect
### updateBookmarkContent - Change the content of a bookmark

```
/**
* @param {String} name - name of bookmark
* @param {String} content - new content
* @param {String} documentEditor - live documentEditor object
*/

updateBookmarkContent('my-bookmark-name', 'new content!', documentEditor)

```

## To run tests:

```
 $ yarn test
```
