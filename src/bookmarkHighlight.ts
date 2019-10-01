import action from './bookmarkAction'

export default (name: string, documentEditor: any, colour: string = '') => {
	action(name, ({selection}) => {
		selection.characterFormat.highlightColor = colour
	}, documentEditor)
}
