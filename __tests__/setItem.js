jest.dontMock('../lib/storage.js')
jest.dontMock('events')
jest.dontMock('util')
jest.dontMock('localStorage')

describe('Storage', function () {
	it ('fires a change event when adding an item', function () {
		var WebStorage = require('../lib/storage.js')
		, localStorage = require('localStorage')
		, storage = new WebStorage(localStorage)
		, bool = false
		, callback = function () {
			bool = true;
			expect(storage.getItem('foo')).toBe('bar');
		}
		;
	
		storage.addListener('change', callback);
		storage.setItem('foo', 'bar');
		expect(bool).toBe(true);

	});
});
