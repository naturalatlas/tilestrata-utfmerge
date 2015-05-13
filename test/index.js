var tilestrata = require('tilestrata');
var TileRequest = tilestrata.TileRequest;
var utfmerge = require('../index.js');
var assert = require('chai').assert;
var utils = require('./utils.js');
var a = require('./fixtures/a.js');

describe('Plugin', function() {
	it('should operate normally', function(done) {
		var server = tilestrata.createServer();
		server.layer('mylayer').route('a.json').use({
			serve: function(server, tile, callback) {
				var data = a.inputs[0];
				var buffer = new Buffer(JSON.stringify(data), 'utf8');
				buffer._utfgrid = data;
				return callback(null, buffer, {'Content-Type':'application/json'});
			}
		});
		server.layer('mylayer').route('b.json').use({
			serve: function(server, tile, callback) {
				var data = a.inputs[1];
				var buffer = new Buffer(JSON.stringify(data), 'utf8');
				return callback(null, buffer, {'Content-Type':'application/json'});
			}
		});

		var tile = TileRequest.parse('/mylayer/0/0/0/c.json');
		var plugin = utfmerge([['mylayer','a.json'],['mylayer','b.json']]);
		plugin.serve(server, tile, function(err, buffer, headers) {
			assert.isFalse(!!err, err);
			utils.assertGridEqual(JSON.parse(buffer.toString('utf8')), a.result);
			utils.assertGridEqual(buffer._utfgrid, a.result);
			done();
		});
	});
});
