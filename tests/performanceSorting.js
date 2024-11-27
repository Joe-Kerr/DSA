import Measurement from "./performanceCommon.js";
import {selectionSort} from "../js/src/algorithms/SelectionSort.js";
import {mergeSort} from "../js/src/algorithms/MergeSort.js";
import {quickSort} from "../js/src/algorithms/QuickSort.js";

///////////////////////////
const ARRAY_SIZE = 1_000;
const SPIN_UP = 1_000;
const SAMPLES = 1_000;
///////////////////////////

const measurement = new Measurement();
measurement.SAMPLES = SAMPLES;
measurement.SPIN_UP = SPIN_UP;
measurement.fillTestArray = function() {
	this.masterTestArray = new Array(ARRAY_SIZE);
	this.masterTestArray.fill(Math.random());
}
measurement.prepareTestArray = function() {
	return this.masterTestArray.map(val=>val)
}

measurement.measure("Array", (testArray)=>{
	testArray.sort((a,b) => (a-b));
});

measurement.measure("Selection", (testArray)=>{
	selectionSort(testArray)
});

measurement.measure("Merge", (testArray)=>{	
	mergeSort(testArray)
});

measurement.measure("Quick", (testArray)=>{	
	quickSort(testArray)
});

measurement.printStats();