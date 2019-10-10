import action from './bookmarkAction'

/**
* @param {String} name -
* @param {Object} documentEditor - Instance of the SF document editor
* @param {String} colour -
*/
export default (name: string, documentEditor: any, colour: string = '') => {
	action(name, ({selection}) => {
		selection.characterFormat.highlightColor = colour
	}, documentEditor)
}
