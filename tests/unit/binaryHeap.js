import assert from "node:assert";
import BinaryHeap from "../../js/src/dataStructures/BinaryHeap.js";

function logArr(arr) {
	console.log(JSON.parse(JSON.stringify(arr)))
}

function verifyMaxHeap(heap) {
	const array = heap.arr;
	
	for(let i=1; i<heap.length; i++) {
		const pi = heap.getParentIndex(i);		
		assert.ok( array[pi] >= array[i], array.toString() );
	}
}

function verifyMinHeap(heap) {
	const array = heap.arr;
	
	for(let i=1; i<heap.length; i++) {
		const pi = heap.getParentIndex(i);		
		assert.ok( array[pi] <= array[i], array.toString() );
	}
}

suite("BinaryHeap");

test("Constructor array likes", ()=>{
	const arrays = [Array, Float32Array, Uint16Array, Int8Array]
				   .map((Class)=>(new Class(10)));
	
	for(let i=0; i<arrays.length; i++) {
		const heap = new BinaryHeap(BinaryHeap.Modes.Max, arrays[i]);
		heap.push(0);
		heap.push(1);
		heap.push(2);
		heap.pop();
		verifyMaxHeap(heap);
	}
});

test("BinaryHeap.push over limit", ()=>{
	const arr = new Float32Array(1);
	const heap = new BinaryHeap(BinaryHeap.Modes.Max, arr);
	let i = 0;
	
	i = heap.push(1);
	i = heap.push(2);
	
	assert.strictEqual(i, -1);
	assert.strictEqual(heap.length, 1);
});

test("Max-BinaryHeap.push", ()=>{
	const heap = new BinaryHeap(BinaryHeap.Modes.Max);
	let i;
	
	i = heap.push(0);
	assert.strictEqual(i, 0);
	verifyMaxHeap(heap);
	
	i = heap.push(17);
	assert.strictEqual(i, 0); //replaces 0; 0 becomes left child of 17
	verifyMaxHeap(heap);	
	
	i = heap.push(6);
	assert.strictEqual(i, 2); // becomes righ child of 17
	verifyMaxHeap(heap);

	i = heap.push(8);
	assert.strictEqual(i, 1); //replaces 0
	verifyMaxHeap(heap);
});

test("Min-BinaryHeap.push", ()=>{
	const heap = new BinaryHeap(BinaryHeap.Modes.Min);
	let i;
	
	i = heap.push(1);
	assert.strictEqual(i, 0);
	verifyMinHeap(heap);
	
	i = heap.push(17);
	assert.strictEqual(i, 1);
	verifyMinHeap(heap);	
	
	i = heap.push(6);
	assert.strictEqual(i, 2); //becomes right child of 1
	verifyMinHeap(heap);

	i = heap.push(8);
	assert.strictEqual(i, 1); //replaces 17
	verifyMinHeap(heap);
	
	i = heap.push(0);
	assert.strictEqual(i, 0);
	verifyMinHeap(heap);	
});

test("Max-BinaryHeap.pop", ()=>{
	const heap = new BinaryHeap(BinaryHeap.Modes.Max);
	let v;

	heap.push(0);
	heap.push(1);
	heap.push(2);
	heap.push(3);
	heap.push(4);
	heap.push(5);
	heap.push(6);
	
	for(let i=6; i>=0; i--) {
		const expectedReturn = i;
		const expectedPeek = i-1 >= 0 ? i-1 : null;
		
		v = heap.pop();
		assert.strictEqual(v, expectedReturn);
		assert.strictEqual(heap.peek(), expectedPeek);
		verifyMaxHeap(heap);		
	}

	assert.strictEqual(heap.pop(), null);
	verifyMaxHeap(heap);
});

test("Min-BinaryHeap.pop", ()=>{
	const heap = new BinaryHeap(BinaryHeap.Modes.Min);
	let v;
	
	heap.push(6);
	heap.push(5);
	heap.push(4);
	heap.push(3);
	heap.push(2);
	heap.push(1);	
	heap.push(0);
	
	for(let i=0; i<=6; i++) {
		const expectedReturn = i;
		const expectedPeek = i < 6 ? i+1 : null;
		
		v = heap.pop();
		assert.strictEqual(v, expectedReturn);
		assert.strictEqual(heap.peek(), expectedPeek);
		verifyMinHeap(heap);		
	}

	assert.strictEqual(heap.pop(), null);
	verifyMinHeap(heap);	
});