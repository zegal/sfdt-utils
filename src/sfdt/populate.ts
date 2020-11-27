import get from 'lodash/get';
import {block as BlockType} from './../../types/sfdt.d';
import {processSFDT, processBlock} from './blocksProcess';
import {isInvalid} from './sfdtHelpers/utils';
// import process from './processInlines'

const debug = false;
const bkmk = {
	data: 'DATA::',
	ref: 'XREF::'
};
const allowedPrefix = Object.values(bkmk);
const containsAllowedPrefix = (name, prefixes) => prefixes.some((prefix) => name.includes(prefix));

const updateTextFormatFields = (obj) => {
	// in populate, we need to make sure to delete fieldtype, end and fontColor. Populate will fill text for the document >> hence remove unnecessary formatting, and update if needed
	if (obj.characterFormat) {
		obj.characterFormat.highlightColor = 'NoColor';
		delete obj.characterFormat.fontColor;
	}
	delete obj['fieldType'];
	delete obj['hasFieldEnd'];
};

export default (data, sfdt, prefixes = allowedPrefix, blankDataCallback) => {
	if (!sfdt) {
		return;
	}

	return processSFDT(sfdt, (block: BlockType) => {
		const callbackBlock = (block: BlockType) => {
			if (get(block, 'inlines.rows')) {
				return get(block, 'inlines');
			}
			return block;
		};

		const callbackInline = (inlines: any[]) => {
			let dataMode = false;

			// using objects here allows for nested bookmarks
			const processing = {};
			const doneProcessing = {};
			// keep track of the current one
			let currentlyProcessing;

			const newInlines: any[] = [];

			inlines.forEach((inline) => {
				const newInline = {...inline};

				// bookmark end
				if (inline.bookmarkType === 1) {
					processing[inline.name] = false;
					debug && console.log('Stopping processing', inline.name, inline);
					if (containsAllowedPrefix(inline.name, prefixes)) {
						dataMode = false;
					}

					currentlyProcessing = '';
					// keep end tag
					newInlines.push(newInline);

					return;
				}

				// middle of a bookmark (TODO: overlapping bookmarks)
				// NOTE: needs to be above the start processing but below end
				// (so it does not also process the opening tag etc)
				if (dataMode) {
					const bookmarkSplits = currentlyProcessing.split('::');
					const processingId = bookmarkSplits[bookmarkSplits.length - 1];
					if (!doneProcessing[currentlyProcessing]) {
						if (!isInvalid(data[processingId])) {
							debug && console.log('Replacing:', newInline, data[processingId], currentlyProcessing);
							//for long text type field we need to translate user inputted line breaks into sfdt new line
							String(data[processingId])
								.split(/(\n)/g)
								.forEach((dataLine) => {
									const splitInline = {...inline};
									//SF recognize vertical tab character to split as new line. Seems it's not the case of LS, PS, CR...
									splitInline.text = dataLine === '\n' ? '\u000B' : dataLine;

									// if (splitInline.characterFormat) {
									// 	splitInline.characterFormat.highlightColor = 'NoColor';
									// }

									updateTextFormatFields(splitInline);
									newInlines.push(splitInline);
								});
							doneProcessing[currentlyProcessing] = true;
						} else {
							// keeping original line if nothing to inject
							// previously we only saved one inline between the bookmark and hence we needed to use updateTextFormatFields(newInline) to remove the fieldType and hasFieldEnd value. But now we add all the inline in between if there is no data[id]
							if (inline.name === currentlyProcessing && inline.bookmarkType === 1)
								doneProcessing[currentlyProcessing] = true;
							else {
								if (blankDataCallback) { 
									newInline.text = blankDataCallback(currentlyProcessing, inline);
									updateTextFormatFields(newInline);
								}
								
								newInlines.push(newInline);
							}
						}
					} else {
						// no else, but just a comment to make it clear
						// we are dropping this line
						// because we only use one child inside a bookmark
					}

					return;
				}

				// bookmark start
				if (inline.bookmarkType === 0) {
					if (containsAllowedPrefix(inline.name, prefixes)) {
						dataMode = true;
					}

					currentlyProcessing = inline.name;
					debug && console.log('Currently Processing', currentlyProcessing);

					processing[inline.name] = true;
					// keep bookmark start tag
					// Case xref: The ref bookmark has no uuid to separate multiple reference in same inline. Hence, they have same bookmark inline.name
					// if its in doneProcessing, then only first occurance will be populated while others are removed (as in above case !doneProcessing[currentlyProcessing])
					// Note that this fix will not work in nested bookmark: only in case bk 0 ends with bk 1 >> we don't need nested bookmark for ref for now anyway
					// Do this in start of bookmark:0 else multi inlines between bookmark 0 and 1 will not work otherwise (all inlines will be updated with text)
					const bookmarkSplits = currentlyProcessing.split('::');
					if (bkmk.ref.includes(bookmarkSplits[0])) {
						doneProcessing[inline.name] = false;
					}
					// ^^ above is for backward compatibility. Now, we have xref with uuid
					newInlines.push(newInline);
					debug && console.log('Starting processing', inline.name, inline);
					return;
				}

				// keep the normal non-inside bookmark and not bookmark start test
				newInlines.push(newInline);
			});

			return newInlines;
		};

		return processBlock(block, callbackInline, callbackBlock);
	});
};

// export default (data, sfdt, prefix = 'DATA::') => {
// 	debug && console.log('data, sfdt', {data, sfdt})

// 	const processInlines = (inlines) => {
// 		let dataMode = false

// 		// using objects here allows for nested bookmarks
// 		let processing = {}
// 		let doneProcessing = {}
// 		// keep track of the current one
// 		let currentlyProcessing

// 		// console.log('inlines', inlines)

// 		const newInlines: any[] = []

// 		inlines.forEach((inline) => {
// 			const newInline = {...inline}

// 			// bookmark end
// 			if (inline.bookmarkType === 1) {
// 				processing[inline.name] = false
// 				debug && console.log('Stopping processing', inline.name, inline)
// 				if (inline.name.includes(prefix)) {
// 					dataMode = false
// 				}

// 				currentlyProcessing = ''
// 				// keep end tag
// 				newInlines.push(newInline)
// 				return
// 			}

// 			// middle of a bookmark
// 			// NOTE: needs to be above the start processing but below end
// 			// (so it does not also process the opening tag etc)
// 			if (dataMode) {
// 			// if (processing[inline.name]) {
// 				if (!doneProcessing[currentlyProcessing]) {
// 					debug && console.log('Replacing:', newInline, data[currentlyProcessing])
// 					if (data[currentlyProcessing] !== undefined && data[currentlyProcessing] !== '') {
// 						// console.log('Doing processing on:', newInline, {newText: data[currentlyProcessing]})
// 						newInline.text = data[currentlyProcessing] + ' '

// 						if (newInline.characterFormat) {
// 							newInline.characterFormat.highlightColor = ''
// 						}
// 					}

// 					newInlines.push(newInline)

// 					doneProcessing[currentlyProcessing] = true
// 				} else {
// 					// no else, but just a comment to make it clear
// 					// we are dropping this line
// 					// because we only use one child inside a bookmark
// 				}

// 				return
// 			}

// 			// bookmark start
// 			if (inline.bookmarkType === 0) {
// 				if (inline.name.includes(prefix)) {
// 					dataMode = true
// 				}

// 				currentlyProcessing = inline.name

// 				processing[inline.name] = true
// 				// keep bookmark start tag
// 				newInlines.push(newInline)
// 				debug && console.log('Starting processing', inline.name, inline)
// 				return
// 			}

// 			// keep the normal non-inside bookmark and not bookmark start test
// 			newInlines.push(newInline)
// 		})

// 		// console.log('Processing results:', {processing, doneProcessing})

// 		return newInlines
// 	}

// 	process(sfdt, processInlines)

// 	return sfdt
// }
