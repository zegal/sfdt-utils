import React from 'react'

import {mount} from 'enzyme'

// import {SampleBase} from './sample-base';
import {DocumentEditorContainerComponent, Toolbar} from '@syncfusion/ej2-react-documenteditor';
// import {TitleBar} from './title-bar';

import defaultDocument from './fixtures/1'

import {enableRipple} from '@syncfusion/ej2-base';

// DocumentEditorContainerComponent.Inject(Toolbar);

enableRipple(true);

export class SampleBase extends React.PureComponent {
	renderComplete() {
		/**custom render complete function */
	}
	componentDidMount() {
		setTimeout(() => {
			this.renderComplete();
		});
	}
}

describe('updateBookmarkContent', function () {
	test.skip('Render editor', function (done) {
		class CustomizedEditor extends SampleBase {
		// class CustomizedEditor extends React.PureComponent {
			constructor() {
				super(...arguments);
				this.onLoadDefault = () => {
					// this.container.current.documentEditor.open(JSON.stringify(defaultDocument));
					// this.container.documentEditor.documentName = 'Getting Started';
					// this.titleBar.updateDocumentTitle();
					// this.container.documentChange = () => {
						// this.titleBar.updateDocumentTitle();
						// this.container.documentEditor.focusIn();
					// };

				};
			}

			// componentDidMount() {
			// 	// this.renderComplete()
			// 	setTimeout(() => {
			// 		// this is from their example
			// 		this.renderComplete();
			// 	}, 0);
			// }

			renderComplete() {
				this.container = React.createRef();
				// this.container.documentEditor.pageOutline = '#E0E0E0';
				// this.container.documentEditor.acceptTab = true;
				// this.container.documentEditor.resize();
				// this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
				this.onLoadDefault();

				// console.log('boomarks:', this.container.documentEditor.getBookmarks())
				done()
			}
			render() {
				return (<div className='control-pane'>
					<div className='control-section'>
						<div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
						<div id="documenteditor_container_body">
							<DocumentEditorContainerComponent id="container" ref={this.container} style={{'display': 'block', 'height': '590px'}} enableToolbar={true} locale='en-US' />
						</div>
					</div>
					<script>{window.onbeforeunload = function () {
						return 'Want to save your changes?';
					}}
					</script>
				</div>);
			}
		}

		const instance = mount(<CustomizedEditor />)
	})
})
