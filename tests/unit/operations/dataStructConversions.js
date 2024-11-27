import assert from "node:assert";
import SingleLinkedList from "../../../js/src/dataStructures/SingleLinkedList.js";
import {convertSingleLinkedListToArray} from "../../../js/src/dataStructures/operations/convert.js";

suite("Data structure conversions");

test("convertSingleLinkedListToArray", ()=>{
	const ll = new SingleLinkedList("a");
	ll.insertTail("b");
	ll.insertTail("c");
	
	assert.deepEqual( convertSingleLinkedListToArray(ll), ["a", "b", "c"] );
});