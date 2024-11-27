import {NumberArray} from "../types.js";

export const stats = {iterations: 0};

export function selectionSort(arr : NumberArray) {
    const n = arr.length;    
    let min = Infinity;
    let iswap = -1;
    let c = 0;

    stats.iterations = 0;

    for(let i0=0; i0<n; i0++) {
        min = Infinity;
        for(let i=i0; i<n; i++) {
            if(arr[i] < min) {
                min = arr[i];
                iswap = i;
            }
            c++;
        }    
        arr[iswap] = arr[i0];
        arr[i0] = min;  
    }

    stats.iterations = c;
}