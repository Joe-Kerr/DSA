import {max} from "../utils/array.js";
import {NumberArrayLike} from "../types.js";

/**Sort array in place by magic mapping. Uses aux arrays.
 * @param array Elements of array must be positive integers.
 * @returns The sorted input array
 */
export function countingSort(array : NumberArrayLike) {
    const len = array.length;
    const maxVal = max(array);
    //#todo Would a map not be more efficient?
    const counting = new Array(maxVal + 1);
    const result = new Array(len);
    let i=0;

    // #todo Any quicker way (this is probably +1 iteration)
    counting.fill(0);

    for(i=0; i<len; i++) {
        counting[array[i]]++;
    }

    // cumulative sum or prefix sum; start at 1 and <=MAX!
    for(i=1; i<=maxVal; i++) {
        counting[i] += counting[i-1];
    }    

    // reverse iteration makes algorithm stable (i.e. "preserves the order of equal elements")
    for(i=len-1; i>=0; i--) {
        result[ counting[array[i]] - 1] = array[i];
        counting[array[i]]--;        
    }

    for(i=0; i<len; i++) {
        array[i] = result[i];
    }
}

export function checkCanCountingSort(array : ArrayLike<number>) {
    if(array instanceof Float32Array || array instanceof Float64Array) {
        return false;
    }

    //#todo can skip conditions for IntBuffers / UintBuffers

    for(let i=0, ii=array.length; i<ii; i++) {
        if(array[i] < 0 || Number.isInteger(array[i]) === false) {
            return false;
        }
    }        

    return true;
}