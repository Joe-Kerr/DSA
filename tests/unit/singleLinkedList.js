import assert from "node:assert";
import SingleLinkedList from "../../js/src/dataStructures/SingleLinkedList.js";
import {convertSingleLinkedListToArray} from "../../js/src/dataStructures/operations/convert.js";

suite("SingleLinkedList");

test("constructor", ()=>{
	const ll = new SingleLinkedList(123);
	const arr = convertSingleLinkedListToArray(ll);	
	assert.deepEqual(arr, [123]);	
});

test("insertHead", ()=>{
	const ll = new SingleLinkedList(123);
	ll.insertTail(456);

	const arr = convertSingleLinkedListToArray(ll);	
	assert.deepEqual(arr, [123, 456]);	
});	

test("insertTail", ()=>{
	const ll = new SingleLinkedList(123);
	ll.insertHead(456);

	const arr = convertSingleLinkedListToArray(ll);	
	assert.deepEqual(arr, [456, 123]);		
});	

test("insertAtIndex", ()=>{
	const ll = new SingleLinkedList(123);	
	ll.insertTail(789);	
	ll.insertAtIndex(1, 456);
	
	const arr = convertSingleLinkedListToArray(ll);	
	assert.deepEqual(arr, [123, 456, 789]);
});	

test("deleteHead", ()=>{
	const ll = new SingleLinkedList(123);
	ll.insertTail(456);

	ll.deleteHead();
	assert.equal(ll.length, 1);
	assert.equal(ll.first, ll.last);
	assert.equal(ll.first.data, 456);
	
	ll.deleteHead();
	assert.equal(ll.length, 0);
	assert.equal(ll.first, ll.last);
	assert.equal(ll.first, null);
});	

test("deleteTail", ()=>{
	const ll = new SingleLinkedList(123);
	ll.insertTail(456);
	
	ll.deleteTail();
	assert.equal(ll.length, 1);
	assert.equal(ll.first, ll.last);
	assert.equal(ll.first.data, 123);	
	
	ll.deleteTail();
	assert.equal(ll.length, 0);
	assert.equal(ll.first, ll.last);
	assert.equal(ll.last, null);	
});

test("deleteIndex", ()=>{
	const ll = new SingleLinkedList(123);	
	ll.insertTail(456);	
	ll.insertTail(789);	
	ll.deleteIndex(1);
	
	const arr = convertSingleLinkedListToArray(ll);	
	assert.deepEqual(arr, [123, 789]);	
});	
	
test("has", ()=>{
	const ll = new SingleLinkedList("a");

	assert.strictEqual(ll.has("a"), true);
	assert.strictEqual(ll.has("b"), false);
});	

test("iterate", ()=>{
	const ll = new SingleLinkedList("a");	
	ll.insertTail("b");	
	ll.insertTail("c");

	const act = [];
	ll.iterate((data, index)=>{
		act[index] = data;
	});
	
	assert.deepEqual(act, ["a", "b", "c"]);
});
	
test("length", ()=>{
	const ll = new SingleLinkedList("a");
	assert.equal(ll.length, 1);
	
	ll.insertHead("b");
	assert.equal(ll.length, 2);	
	
	ll.insertTail("c");
	assert.equal(ll.length, 3);	
	
	ll.insertAtIndex(2, "d");
	assert.equal(ll.length, 4);	
	
	ll.deleteIndex(2);
	assert.equal(ll.length, 3);
	
	ll.deleteHead();
	assert.equal(ll.length, 2);	
	
	ll.deleteTail();
	assert.equal(ll.length, 1);	
	
	ll.deleteTail();
	assert.equal(ll.length, 0);
});