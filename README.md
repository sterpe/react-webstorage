react-webstorage
===

Use any implementation of W3C WebStorage API directly as a React/Flux-style store.

````javascript
var WebStorage = require('react-webstorage')
, dispatcher = require('./path/to/app-dispatcher')
;

var webStorage = new WebStorage(window.localStorage ||
	window.sessionStorage /* or poly-fill thereof */
);

dispatcher.register(function (payload) {
	switch (payload.actionType) {
	case 'A':
		webStorage.setItem(payload.key, payload.item);
		break;
	case 'B':
		webStorage.removeItem(payload.key);
		break;
	case 'C': 
		webStorage.clear();
		break;
	default:
		return;
	}
});

// Later, inside a component...

	getInitialState: function () {
		return {
			foo: webStorage.getItem('foo');
		};
	},
	updateState: function () {
		this.setState({
			foo: webStorage.getItem('foo')
		});
	},
	componentDidMount: function () {
		webStorage.addListener('change', this.updateState);
	},
	componentWillUnmount: function () {
		webStorage.removeListener('change', this.updateState);
	}

````
WebStorage Instance implements the WebStorage API, and in cases where the contents of WebStorage is modified (setItem, removeItem, clear) fires a `change`  event to registered listeners.

WebStorage API details here: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
