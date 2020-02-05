// base style format taken from https://github.com/syncfusion/ej2-javascript-ui-controls/blob/295f3e12ea/controls/documenteditor/src/document-editor/implementation/viewer/sfdt-reader.ts#L175
export const baseStyles = {
	paragraph: {
		type: 'Paragraph',
		name: 'Normal',
		next: 'Normal'
	},
	character: {
		type: 'Character',
		name: 'Default Paragraph Font'
	}
};

// base default listFormat taken from https://github.com/syncfusion/ej2-javascript-ui-controls/blob/d19a2fcd57969a9dfb7986c02806984b873d8ff4/controls/documenteditor/src/document-editor/implementation/format/list-format.ts#L111
export const defaultListFormat = {
	listId: -1,
	listLevelNumber: 0
};
