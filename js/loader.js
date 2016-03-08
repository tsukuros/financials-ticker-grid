(function (app) {
	'use strict';

	app.xhr = {
		get: function (url, done) {
			var request = new XMLHttpRequest();
			request.open('GET', url, true);

			request.onload = function () {
				if (request.status >= 200 && request.status < 400) {
					done(request.responseText);
				} else {
					window.console.log('We reached our target server, but it returned an error');
				}
			};

			request.onerror = function (err) {
				window.console.error('There was a connection error of some sort');
			};

			request.send();
		}
	};
	
}(window.app = window.app || {}));
