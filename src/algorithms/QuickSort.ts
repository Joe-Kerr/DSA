import {NumberArray} from "../types.js";

function partition(arr : NumberArray, lo : number, hi : number) {
    let pivot: number = arr[hi];
    let i=lo-1;
    let swap=0;
    
    //Move values smaller than pivot to right
    for(let j=lo; j<hi; j++) {
        if(arr[j] < pivot) {
            i++;
            swap = arr[i];
            arr[i] = arr[j];
            arr[j] = swap;            
        }
    }

    //...and finally also move pivot to the right
    const np = i+1;
    swap = arr[np];
    arr[np] = arr[hi];
    arr[hi] = swap;        

    /**Pivot index */
    return i+1;
}

function quickSortRecur(arr : NumberArray, lo : number, hi: number) {
    if(lo < hi) {
        const pivotIdx = partition(arr, lo, hi);

        /**pivot must be exclusive! */
        quickSortRecur(arr, lo, pivotIdx-1);        
        quickSortRecur(arr, pivotIdx+1, hi);        
    }

}

/**@link https://www.youtube.com/watch?v=VNrF8ugTUkI */
export function quickSort(arr : NumberArray) {
    quickSortRecur(arr, 0, arr.length - 1);
}