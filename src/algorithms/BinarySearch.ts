export const stats = {iterations: 0, mids: []};

/**@returns Index in search array */
export function binarySearch(arr : ArrayLike<number>, find : number) : number {
    const n = arr.length;
    let mid = 0;
    let safety = n;

    let i0 = 0;
    let i1 = n - 1;
    let c=0;

    stats.iterations = 0;
    //stats.mids.length = 0;

    while(safety-- > 0) {
        c++;
        mid = Math.floor( (i0 + i1) / 2 ); 
        //stats.mids.push(mid)

        if(arr[mid] === find) {
            stats.iterations = c;
            return mid;
        }

        if(arr[mid] > find) {
            i1 = mid;
        }
        else {
            i0 = mid+1;
        }
    }
    stats.iterations = c;
    return -1;
}