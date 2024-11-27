import assert from "node:assert";
import {linearRegression} from "../../js/src/algorithms/LinearRegression.js";

suite("Machine learning algorithms");

//#todo how can I test more messy data

test("Linear regression", ()=>{
	let data = [1,1, 2,2, 3,3, 4,4];
	let coeffs = linearRegression.calcCoefficient(data);
	assert.equal(linearRegression.predictY(8, coeffs[0], coeffs[1]), 8)
	
	data = [1,1, 2,2, 3,3, 3,4, 4,3];
	coeffs = linearRegression.calcCoefficient(data);
	assert.equal(linearRegression.predictY(8, coeffs[0], coeffs[1]), 8)
});