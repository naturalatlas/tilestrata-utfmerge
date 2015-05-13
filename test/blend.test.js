var blend = require('../blend.js');
var assert = require('chai').assert;
var utils = require('./utils.js');

describe('blend()', function() {
	it('should merge utfgrids', function() {
		var fixture = require('./fixtures/a.js');
		var output = blend(fixture.inputs);
		utils.assertGridEqual(output, fixture.result);
	});
});
