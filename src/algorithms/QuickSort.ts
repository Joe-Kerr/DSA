import {NumberArrayLike} from "../types.js";

// Performs worse. No point really in keeping it anymore (?).
function partitionLomutoAlgo(arr : NumberArrayLike, lo : number, hi : number) {
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

// About ~0.3ms slower than js native sort. #todo
// See also https://www.geeksforgeeks.org/hoares-vs-lomuto-partition-scheme-quicksort/
function partitionWhoreAlgo(arr : NumberArrayLike, lo : number, hi : number) {
    let pivot = arr[lo];
    let i=lo-1;
    let j=hi+1;
    let swap = 0;

    const max = arr.length - 1;
    let safety = arr.length;

    while(safety-- >= 0) {
        do {
            i++;
        } 
        while (arr[i] < pivot && i <= max);

        do {
            j--;
        } 
        while (arr[j] > pivot && j >= 0);

        if(i < j) {
            swap = arr[i];
            arr[i] = arr[j];
            arr[j] = swap;
        }

        else {
            break;
        }
    }
    
    return j;
}

function quickSortRecur(arr : NumberArrayLike, lo : number, hi: number) {
    if(lo < hi) {
        const pivotIdx = partitionWhoreAlgo(arr, lo, hi);

        //quickSortRecur(arr, lo, pivotIdx-1); //Lomuto partition  
        quickSortRecur(arr, lo, pivotIdx);     //Whore partition  
        quickSortRecur(arr, pivotIdx+1, hi);        
    }
}

/**@link https://www.youtube.com/watch?v=VNrF8ugTUkI */
export function quickSort(arr : NumberArrayLike) {
    quickSortRecur(arr, 0, arr.length - 1);
}