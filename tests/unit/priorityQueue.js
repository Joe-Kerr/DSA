import assert from "node:assert";
import PriorityQueue from "../../js/src/dataStructures/PriorityQueue.js";

suite("PriorityQueue");

function logArr(arr) {
	console.log(JSON.parse(JSON.stringify(arr)))
}

test("Max PriorityQueue", ()=>{
	const pq = new PriorityQueue(PriorityQueue.Modes.Max);
	let v=0;
	
	//       val  priority
	pq.enqueue(0, 9);
	assert.strictEqual(pq.peekValue(), 0);	
	
	pq.enqueue(1, 8);
	assert.strictEqual(pq.peekValue(), 0);
	
	v = pq.dequeue();
	assert.strictEqual(v, 0);
	assert.strictEqual(pq.peek(), 8);
});

test("Min PriorityQueue", ()=>{
	const pq = new PriorityQueue(PriorityQueue.Modes.Min);
	let v=0;
	
	//       val  priority
	pq.enqueue(0, 9);
	assert.strictEqual(pq.peekValue(), 0);	
	
	pq.enqueue(1, 8);
	assert.strictEqual(pq.peekValue(), 1);
	
	v = pq.dequeue();
	assert.strictEqual(v, 1);
	assert.strictEqual(pq.peek(), 9);
});

test("PriorityQueue.dequeue", ()=>{
	const pq = new PriorityQueue(PriorityQueue.Modes.Min);
	
	pq.enqueue(1, 10);
	assert.equal(pq.peek(), 10);
	assert.strictEqual(pq.peekValue(), 1);	
	
	const value = pq.dequeue();
	assert.strictEqual(value, 1);
	assert.strictEqual(pq.length, 0);
	assert.strictEqual(pq.peek(), null);
	assert.strictEqual(pq.peekValue(), null);
	
	pq.enqueue(1, 10);
	assert.equal(pq.peek(), 10);
	assert.strictEqual(pq.peekValue(), 1);
	
});

test("PriorityQueue enqueues with dequeue", ()=>{
	const openList = new PriorityQueue(PriorityQueue.Modes.Min);

	openList.enqueue(1, 5);
	openList.dequeue();
	openList.enqueue(15, 4);
	openList.enqueue(16, 3);
	
	assert.strictEqual(openList.length, 2);
	assert.equal(openList.peek(), 3);
	assert.equal(openList.peekValue(), 16);
	assert.equal(openList.dequeue(), 16);
});