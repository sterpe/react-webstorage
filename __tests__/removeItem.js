jest.dontMock('../lib/storage.js')
jest.dontMock('events')
jest.dontMock('util')
jest.dontMock('localStorage')

describe('webStorage#removeItem()', function () {
	it('emits `change` event when removing an item', function () {
		var WebStorage = require('../lib/storage.js')
		, localStorage = require('localStorage')
		, webStorage = new WebStorage(localStorage)
		, callbacks = 0
		, cb = function () {
			callbacks += 1;
			expect(localStorage.length).toBe(webStorage.length);
		}
		;
		webStorage.addListener('change', cb);
		webStorage.setItem('foo', 'bar');
		webStorage.removeItem('foo');
		webStorage.removeItem('bar');
		expect(callbacks).toBe(2);
	});
});
