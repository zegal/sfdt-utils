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

### Has Bookmark - Detect if a bookmark exists

```
/**
* @param {String} name - Bookmark name
* @param {Object} documentEditor - Instance of the SF document editor
*
* @returns {Boolean} - True if the bookmark exists in the editor
*/

hasBookmark(name, documentEditor)
```

### Toggle Bookmark - Hide or show the content of a bookmark

```
/**
* @param {Object} SFDT - The SF SFDT JSON object
* @param {String} bookmarkName - Bookmark to toggle on or off
* @param {Boolean} toggleOn - True to show bookmark content, false to hide it
*
* @returns {Object} updatedSFDT
*/

const updatedSFDT = toggleBookmark(SFDT, bookmarkName, toggleOn)
```

## To run tests:

```
 $ yarn test
```
