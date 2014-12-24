jest.dontMock('../lib/storage.js')
jest.dontMock('events')
jest.dontMock('util')
jest.dontMock('localStorage')

describe('webStorage#clear()', function () {
	it('emits `change` event when storage is cleared.', function () {
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
		webStorage.clear();
		expect(callbacks).toBe(2);
	});
});
