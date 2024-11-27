import assert from "node:assert";
import {binarySearch, stats} from "../../js/src/algorithms/BinarySearch.js";

suite("Search algorithms");

test("binarySearch", ()=>{
	const arr = [0,1,2,3, 5,6,7,8,9];
	let i = -1;
	
	i = binarySearch(arr, 0);	
	assert.equal(i, 0);
	assert.equal(stats.iterations, 4);	
	
	i = binarySearch(arr, 9);	
	assert.equal(i, 8);
	assert.equal(stats.iterations, 4);
	
	i = binarySearch(arr, 3);	
	assert.equal(i, 3);
	assert.equal(stats.iterations, 3);	
	
	i = binarySearch(arr, 6);	
	assert.equal(i, 5);
	assert.equal(stats.iterations, 3);		
});