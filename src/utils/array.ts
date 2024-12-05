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