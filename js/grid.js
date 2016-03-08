(function (app) {
	'use strict';

	app.Grid = function (element, options) {
		this.el = element;
		this.dataset = options.data;

		this.headRow = new app.GridRow(this.dataset.shift());
		this.headRowEl = this.headRow.generateMarkUp(true);
		this.rows = [];
		// setup
		this.dataset.forEach(function (rowArr) {
			this.rows.push(new app.GridRow(rowArr));
		}.bind(this));
		this.initialRender(this.rows);
	};

	app.Grid.prototype.merge = function (newSet) {
		var i = 0,
			len = this.rows.length;

		while (i < len) {
			var newSetRow = newSet[i];

			if (newSetRow[2] && newSetRow[3] && newSetRow[4]) {
				this.rows[i].cells[2] = newSetRow[2];
				this.rows[i].cells[3] = newSetRow[3];
				this.rows[i].cells[4] = newSetRow[4];
				this.rows[i].beenUpdated = true;
			} else {
				this.rows[i].beenUpdated = false;
			}
			i++;
		}

	};

	app.Grid.prototype.update = function (newSet) {
		this.merge(newSet);
		this.render(this.rows);
	};

	app.Grid.prototype.initialRender = function (rows) {
		var table = document.createElement('table'),
			thead = document.createElement('thead');
		this.tbody = document.createElement('tbody');

		thead.appendChild(this.headRowEl);
		table.appendChild(thead);
		table.appendChild(this.tbody);

		this.el.appendChild(table);

		rows.forEach(function (row) {
			this.tbody.appendChild(row.generateMarkUp());
		}.bind(this));
	};

	app.Grid.prototype.render = function (rows) {
		this.tbody.innerHTML = '';
		var i = 0,
			len = rows.length;

		while (i < len) {
			var tr = rows[i].generateMarkUp(),
				children = [];
			this.tbody.appendChild(tr);
			if (rows[i].beenUpdated) {
				children = tr.children;
				rows[i].fadeIn(children[2], 200);
				rows[i].fadeIn(children[3], 200);
				rows[i].fadeIn(children[4], 200);
			}

			i++;
		}
	};

}(window.app = window.app || {}));
