(function (app) {
	'use strict';
	
	// Publisher/Subscriber pattern
	app.engine = (function () {
		var channels = {},
			on = function (channel, context, fn) {
				if (!this.channels[channel]) {
					this.channels[channel] = [];
				}
				this.channels[channel].push({
					context: context,
					fn: fn
				});
			},

			emit = function (channel) {
				if (!this.channels[channel]) return false;

				var args = [].slice.call(arguments, 1);

				this.channels[channel].forEach(function (sub) {
					sub.fn.apply(sub.context, args);
				});
			};

		return {
			channels: channels,
			on: on,
			emit: emit
		};
	}());

	app.init = function () {
		function transition() {
			index++;
			if (index >= deltas.length) index = 0;

			setTimeout(function () {
				app.engine.emit('update', deltas[index].rows, index);
				transition();
			}.bind(this), deltas[index].time);
		}

		var el = document.querySelector('[data-grid]'),
			options = el.getAttribute('data-grid'),
			o = JSON.parse(options),
			data = [],
			deltas = [],
			grid,
			index = -1;

		if (o.src && o.pollUrl) { // this was an attempt to generalize the initialization through options object
			// load snapshot.csv
			app.xhr.get(o.src, function (res) {
				data = app.parseSnapshot(res);
				grid = new app.Grid(el, {
					data: data
				});

				app.engine.on('update', grid, grid.update);
			});

			// load deltas.csv
			app.xhr.get(o.pollUrl, function (res) {
				deltas = app.parseDeltas(res);
				transition();
			});
		}
	}();

})(window.app = window.app || {});
