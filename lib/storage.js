/** @jsx React.DOM */
var EventEmitter = require('events').EventEmitter
, util = require('util')
, prototype
;

module.exports = function (Storage) {
	module.exports.super_.call(this);
	this.Storage = Storage;
};

util.inherits(module.exports, EventEmitter);

prototype = module.exports.prototype;

prototype.key = function (n) {
	return this.Storage.key(n);
};
prototype.getItem = function (key) {
	return this.Storage.getItem(key);
};
prototype.setItem = function (key, item) {
	var oldItem = this.getItem(key)
	, retval
	;
	retval = this.Storage.setItem(key, item);
	if (oldItem === null || oldItem !== item) {
		this.emit('change');
	}
	return retval;
};
prototype.removeItem = function (key) {
	var oldItem = this.getItem(key)
	, retval
	;
	retval = this.Storage.removeItem(key);
	if (oldItem !== null) {
		this.emit('change');
	}
	return retval;
};
prototype.clear = function () {
	var length = this.Storage.length
	, retval
	;
	retval = this.Storage.clear();
	if (length !== 0) {
		this.emit('change');
	}
	return retval;
};
Object.defineProperty(prototype, 'length', {
	get: function () {
		return this.Storage.length;
	}
	, configurable: false
	, enumerable: false
});
