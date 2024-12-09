import assert from "node:assert";
import {selectionSort, stats as selectionSortStats} from "../../js/src/algorithms/SelectionSort.js";
import {mergeSort, stats as mergeSortStats} from "../../js/src/algorithms/MergeSort.js";
import {quickSort} from "../../js/src/algorithms/QuickSort.js";
import {countingSort} from "../../js/src/algorithms/CountingSort.js";

suite("Sort algorithms");

const testData = [
	{desc: "uneven", 	data: [4,3, 9,7, 0],			expected: [0,3,4,7,9]},
	{desc: "even", 		data: [4,3, 9,7], 				expected: [3,4,7,9]},
	{desc: "0-9", 		data: [0,9,8,7,6,5,4,3,2,1], 	expected: [0,1,2,3,4,5,6,7,8,9]},
	{desc: "clones", 	data: [9, 1,1, 8, 2,2, 7], 		expected: [1,1,2,2,7,8,9]}
];

const testAlgos = {
	selectionSort,
	mergeSort,
	quickSort,
	countingSort
};

function executeCase(algoName, algoFn, tcase) {
	const actual = JSON.parse(JSON.stringify(tcase.data));
	
	algoFn(actual);
	
	assert.deepEqual(tcase.expected, actual, algoName + ": " + tcase.desc);
}


for(const algoName in testAlgos) {
	const fn = testAlgos[algoName];
	
	test(algoName, ()=>{
		for(let i=0; i<testData.length; i++) {
			executeCase(algoName, fn, testData[i]);
		}
	});
}