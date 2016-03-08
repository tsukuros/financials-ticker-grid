(function (app) {
	'use strict';

	app.GridRow = function (data) {
		this.cells = data;
		this.beenUpdated = false;
	};

	app.GridRow.prototype.fadeIn = function (el, duration) {
		duration = duration || 400;
		el.style.opacity = 0;

		var last = +new Date(),
			tick = function () {
				el.style.opacity = +el.style.opacity + (new Date() - last) / duration;
				last = +new Date();

				if (+el.style.opacity < 1) {
					(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
				}
			};

		tick.call(this);

	};

	app.GridRow.prototype.generateMarkUp = function (head) {
		var tr = document.createElement('tr');

		this.cells.forEach(function (cell) {
			var td = document.createElement(head ? 'th' : 'td');
			td.innerHTML = cell;
			tr.appendChild(td);
		});

		return tr;
	};

}(window.app = window.app || {}));