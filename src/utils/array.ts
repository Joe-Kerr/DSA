import {NumberArrayLike} from "../types.js";

export function push(arr : NumberArrayLike, el : number, nextIdx : number) {    
    if(arr[nextIdx] !== undefined || arr instanceof Array) {
        arr[nextIdx] = el;
        return nextIdx;
    }
    else {
        return -1;
    }
}

export function max(array : ArrayLike<number>) {
    let lead : number = -Infinity;
    
    for(let i=0, ii=array.length; i<ii; i++) {
        if(array[i] > lead) {
            lead = array[i];
        }
    }
    return lead;
}