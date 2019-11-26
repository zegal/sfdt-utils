import updateBookmarkContent from '../updateBookmarkContent'

import React from 'react';
import {mount} from 'enzyme'

// import {DocumentEditor} from '@syncfusion/ej2-documenteditor/dist/es6/ej2-documenteditor.es2015';

import {
	DocumentEditor,
	Selection,
	Editor
} from '@syncfusion/ej2-documenteditor'
import {ComponentBase, applyMixins} from '@syncfusion/ej2-react-base';

import docJson from './fixtures/1'

class DocumentEditorComponent extends DocumentEditor {
	constructor(props) {
		super(props);
		this.initRenderCalled = false;
		this.checkInjectedModules = true;
		this.immediateRender = true;
		this.restrictEditing = true;
	}
	render() {
		if ((this.element && !this.initRenderCalled) || this.refreshing) {
			// console.log('a1')
			super.render();
			this.initRenderCalled = true;
		} else {
			// console.log('a2')
			return React.createElement('div', this.getDefaultAttributes(), this.props.children);
		}
	}
}
applyMixins(DocumentEditorComponent, [ComponentBase, React.PureComponent]);

DocumentEditorComponent.Inject(
	Selection,
	Editor
)

const documentEditor = {
	getBookmarks() {
		return []
	},
	selection: {
		selectBookmark: jest.fn()
	},
	editor: {
		insertText: jest.fn()
	}
}

describe('updateBookmarkContent', function() {
	test.skip('editor load', function(done) {
		class CustomizedEditor extends React.Component {
			componentDidMount() {
				// this.renderComplete()
				setTimeout(() => {
					// this is from their example
					this.renderComplete();
				}, 0);
			}

			renderComplete() {
				this.container = React.createRef();
				if (!container) {
					return;
				}
				setTimeout(() => {
					console.log('3')
					// this is from their example
					this.documentEditor = this.container.current;
					let defaultDocument = docJson;

					console.log('this.documentEditor', this.documentEditor)

					this.documentEditor.open(JSON.stringify(defaultDocument));
					console.log('boomarks:', this.documentEditor.getBookmarks())

					done()
				}, 10)

				// console.log('1')
			}

			render() {
				// console.log('2')
				return (
					<DocumentEditorComponent
						id='container'
						ref={this.container}
						style={{}}
						locale='en-US'
						isReadOnly={false}
						enableEditor={true}
						enableSelection={true}
						enableToolbar={true}

					/>
				)
			}
		}

		mount(<CustomizedEditor />)

		// updateBookmarkContent('one', 'C', documentEditor)
	})
})
