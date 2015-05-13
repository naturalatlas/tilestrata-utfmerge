var blend = require('../blend.js');
var assert = require('chai').assert;

function assertGridEqual(result, expected){
	assert.deepEqual(result.keys, expected.keys, 'keys should match');
	for(var i = 0; i < expected.grid.length; i++){
		assert.equal(result.grid[i], expected.grid[i], 'row '+i+' should match');
	};
	assert.deepEqual(result.data, expected.data, 'data property should match');
}

describe('blend()', function() {
	it('should merge utfgrids', function() {
		var fixture = require('./fixtures/a.js');
		var output = blend(fixture.inputs);
		assertGridEqual(output, fixture.result);
	});
});