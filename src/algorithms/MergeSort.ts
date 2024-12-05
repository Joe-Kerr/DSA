import {NumberArrayLike} from "../types.js";

export const stats = {iterations: 0};

function merge(arr : NumberArrayLike, l : number, r : number, mid : number) {
    //slice end is exclusive
    const lArr = arr.slice(l, mid+1);
    const rArr = arr.slice(mid+1, r+1); 

    let k = l;

    //console.log({l,r,mid,k, left: lArr.map(copy), right: rArr.map(copy)});
    //console.log("  ", arr.map(copy))

    let il = 0;
    let ir = 0;
    let c=0;

    while(k < arr.length && (lArr[il] !== undefined || rArr[ir] !== undefined)) {
        if(lArr[il] === undefined && rArr[ir] === undefined) {
            break;
        }
        else if(lArr[il] === undefined) {
            arr[k] = rArr[ir];
            ir++;
        }
        else if(rArr[ir] === undefined) {
            arr[k] = lArr[il];
            il++;
        }
        // "<=" not "<" !!! Half an hour of debugging ghosts and questioning my sanity went here :/
        else if(lArr[il] <= rArr[ir]) {
            arr[k] = lArr[il];
            il++;
        }
        else {
            arr[k] = rArr[ir];
            ir++;
        }
        k++;
        c++;
    }

    stats.iterations += c;
}

function recurMergeSort(arr : NumberArrayLike, l : number, r : number) {
    if(l < r) {        
        const mid = Math.floor( (l + r) / 2 );
        recurMergeSort(arr, l, mid);
        recurMergeSort(arr, mid+1, r);
        merge(arr, l, r, mid);
    }    
}

/**@link https://youtu.be/hPzlKHFc3Y4?si=6Yi-VvAvplMVVgGA&t=570 (sorting) */
export function mergeSort(arr : NumberArrayLike) {
    stats.iterations = 0;
    recurMergeSort(arr, 0, arr.length-1);
}