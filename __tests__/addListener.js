jest.dontMock('../lib/storage.js')
jest.dontMock('events')
jest.dontMock('util')
jest.dontMock('localStorage')

describe('Storage', function () {
	it('adds a listener for change', function () {
		var WebStorage = require('../lib/storage.js')
		, localStorage = require('localStorage')
		, storage = new WebStorage(localStorage)
		, flag = false
		, callback = function () {
			flag = true;
		}
		;

		storage.addListener('change', callback);
		storage.emit('change');

		expect(flag).toBe(true);
	});
});
