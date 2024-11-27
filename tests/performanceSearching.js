import Measurement from "./performanceCommon.js";
import {binarySearch} from "../js/src/algorithms/BinarySearch.js";

///////////////////////////
const ARRAY_SIZE = 10_000;
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
	return this.masterTestArray;
}

const first = measurement.masterTestArray[0];
const last = measurement.masterTestArray[ measurement.masterTestArray.length - 1 ];
const mid = measurement.masterTestArray[ Math.floor(measurement.masterTestArray.length/2) ];

measurement.measure("For loop", (testArray)=>{
	for(let i=0, ii=testArray.length; i<ii; i++) {
		if(testArray[i] === mid) {
			break;
		}
	}
});

measurement.measure("Array.find", (testArray)=>{
	testArray.find((a)=>(a === mid));
});


measurement.measure("BinarySearch (sorted)", (testArray)=>{
	binarySearch(testArray, mid)
});

measurement.measure("BinarySearch (unsorted)", (testArray)=>{
	//#todo testArray reference will be sorted after first call to measure; is this bad for this test?
	testArray.sort();
	binarySearch(testArray, mid)
});

measurement.printStats();