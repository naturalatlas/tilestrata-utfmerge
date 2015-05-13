var dependency = require('tilestrata-dependency');
var blend = require('./blend.js');

module.exports = function(layers, options) {
	options = options || {};

	var layers = layers.map(function(pair) {
		var layer = pair[0];
		var filename = pair[1];
		return dependency(layer, filename);
	});

	return {
		serve: function(server, req, callback) {
			var grids, result;

			async.series([
				function loadTiles(callback) {
					async.map(layers, function(layer, callback) {
						layer.serve(server, req, function(err, buffer, headers) {
							callback(err, buffer._utfgrid);
						});
					}, function(err, result) {
						grids = result;
						callback(err);
					});
				},
				function blendTiles(callback) {
					var merged = blend(grids, options);
					result = new Buffer(JSON.stringify(merged), 'utf8');
					result._utfgrid = merged;
					grids = null;
				}
			], function(err) {
				if (err) return callback(err);
				callback(null, result, {'Content-Type': 'application/json')});
			});
		}
	};
};