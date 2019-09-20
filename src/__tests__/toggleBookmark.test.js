import toggleBookmark from '../toggleBookmark'

describe('toggleBookmark', function() {
	test('1', function() {
		toggleBookmark('test', {a: 1}, 'a + 2', {})
	})
})
