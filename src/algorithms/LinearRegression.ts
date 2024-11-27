import {mean, sum} from "../math/statistics.js";

//#todo This is all mega inefficient as I iterate multiple times over the input arrays.

function sumElementProducts(a : number[], b : number[]) {
    let product = 0;

    for(let i=0; i<a.length; i++) {
        product += a[i] * b[i];
    }

    return product;
}

// https://www.geeksforgeeks.org/linear-regression-python-implementation
function estimateCoefficients(x : number[], y : number[]) {
    const n = x.length;
    const meanX = mean(x);
    const meanY = mean(y);
    const prodSum = sumElementProducts(x,y);

    //#todo #bug? Shouldnt the sum be over all terms?
    const SS_xy = prodSum - n * meanX * meanY;
    const SS_xx = prodSum - n * meanX * meanX;

    const regCoef1 = SS_xy / SS_xx;
    const regCoef0 = meanY - regCoef1 * meanX;

    return [regCoef0, regCoef1];
}

function calculateCoeffSimpleLinearRegression(valuePairs : number[]) {
    const a : number[] = [];
    const b : number[] = [];

    for(let i=0; i<valuePairs.length; i+=2) {
        a.push(valuePairs[i]);
        b.push(valuePairs[i+1]);
    }

    return estimateCoefficients(a,b);

}

function predictY(x : number, coeff0 : number, coeff1 : number) {
    return coeff0 + coeff1 * x;
}

export const linearRegression = {
    calcCoefficient: calculateCoeffSimpleLinearRegression,
    predictY: predictY
};