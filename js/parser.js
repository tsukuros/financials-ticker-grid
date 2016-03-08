(function (app) {
	'use strict';

	app.parseSnapshot = function (table) {
		table = table.split('\n').map(function (row) {
			return row.split(',');
		});
		table.pop();
		return table;
	};

	app.parseDeltas = function (table) {
		var groups = [],
			len, table = table.split('\n').map(function (row) {
				return row.split(',');
			});
		table.pop();

		len = table.length;

		for (var i = 0; i < len; i += 11) {
			groups.push(table.slice(i, i + 11));
		}

		return groups.map(function (arr) {
			var len = arr.length;
			return {
				time: Number(arr[len - 1][0]),
				rows: arr.slice(0, len - 1)
			}
		});
	};

}(window.app = window.app || {}));