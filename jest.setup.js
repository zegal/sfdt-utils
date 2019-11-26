import React from 'react';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});


global.self.
Object.defineProperty(global.self, 'crypto', {
	value: {
		getRandomValues: (arr) => 1
	}
});
