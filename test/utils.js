var assert = require('chai').assert;

module.exports.assertGridEqual = function(result, expected){
	assert.deepEqual(result.keys, expected.keys, 'keys should match');
	for(var i = 0; i < expected.grid.length; i++){
		assert.equal(result.grid[i], expected.grid[i], 'row '+i+' should match');
	};
	assert.deepEqual(result.data, expected.data, 'data property should match');
};
