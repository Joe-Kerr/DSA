import assert from "node:assert";
import {binarySearch, stats} from "../../js/src/algorithms/BinarySearch.js";
import {breadthFirstSearchFind} from "../../js/src/algorithms/BreadthFirstSearch.js";

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

//#todo measure performance (I needed this quickly)
//#todo move into own class
test("breadthFirstSearchFind simple path search", ()=>{
	const graph = {
		1: [2, 3],
			2: [4, 5, 6],
				6: [9, 10],
					10: [11],
			3: [7, 8],
				7: [12, 13]
	};
	
	function addNeighbours(node, out) {
		if(graph[node]) {
			graph[node].forEach((n)=>{
				out.add(n);
			});
		}
	}
	
	let simple;

	simple = breadthFirstSearchFind(1, 11, {addNeighboursToRef: addNeighbours});
	
	assert.deepEqual(simple, [1,2,6,10,11]);
});

test("breadthFirstSearchFind no path possible", ()=>{
	const graph = {
		1: [2, 3],
			2: [4, 5, 6],
				6: [9, 10],
					10: [11],
			3: [7, 8],
				7: [12, 13]
	};
	
	function addNeighbours(node, out) {
		if(graph[node]) {
			graph[node].forEach((n)=>{
				out.add(n);
			});
		}
	}
	
	let simple;

	simple = breadthFirstSearchFind(2, 13, {addNeighboursToRef: addNeighbours});
	assert.deepEqual(simple, [], "No connection");
	
	simple = breadthFirstSearchFind(23, 13, {addNeighboursToRef: addNeighbours});
	assert.deepEqual(simple, [], "Invalid start");		
	
	simple = breadthFirstSearchFind(1, 23, {addNeighboursToRef: addNeighbours});
	assert.deepEqual(simple, [], "Invalid target");		
	
	//#todo is a 1-step path a path?
	simple = breadthFirstSearchFind(3, 3, {addNeighboursToRef: addNeighbours});
	assert.deepEqual(simple, [3], "start == find");	
});


test("breadthFirstSearchFind cyclical path", ()=>{
	const graph = {
		1: [2],
			2: [1, 3],
				3: [1, 4],
					4: [5]
	};
	
	function addNeighbours(node, out) {
		if(graph[node]) {
			graph[node].forEach((n)=>{
				out.add(n);
			});
		}
	}
	
	let simple;

	simple = breadthFirstSearchFind(1, 5, {addNeighboursToRef: addNeighbours});
	
	assert.deepEqual(simple, [1,2,3,4,5]);
});