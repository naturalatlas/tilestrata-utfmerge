module.exports = function(grids, options){
	var result = grids[0];
	for(var i = 1; i<grids.length; i++){
		result = merge(result, grids[i]);
	}
	return result;
}

/**
 * Merges two utfgrid objects
 * 
 * @param  {object} a - original utfgrid
 * @param  {object} b - utfgrid to put on top
 * @return {object}
 */
function merge(a, b){
	var grid_c = [];
	var data_c = {};

	var dim = a.grid.length;
	var offset = b.keys.length;

	for(var y = 0; y < dim; y++){
		var row_a = a.grid[y];
		var row_b = b.grid[y];
		var row_c = [];
		for(var x = 0; x < dim; x++){
			var id_a = decode(row_a.charCodeAt(x));
			var id_b = decode(row_b.charCodeAt(x));
			var id_c = 0;
			if(b.data[id_b]){
				id_c = id_b;
				data_c[id_c] = b.data[id_b];
			} else if (a.data[id_a]) {
				id_c = id_a + offset;
				data_c[id_c] = a.data[id_a];
			}
			row_c.push(encode(id_c));
		}
		grid_c.push(row.join(''));
	}

	return {
		grid: grid_c,
		data: data_c,
		keys: Object.keys(data_c)
	};
}

function decode(x){
	if(x >= 93) x--;
	if(x >= 35) x--;
	return x - 32;
}
function encode(x){
	x += 32;
	if(x >= 34) x++;
	if(x >= 92) x++;
	return String.fromCharCode(x);
}