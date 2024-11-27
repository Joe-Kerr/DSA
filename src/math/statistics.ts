// Deviating from the get-prefix (function name) in order to have it more "Mathy"

export function sum(arr : number[]) {
    return arr.reduce( (a,b)=>(a + b), 0 )
}

export function mean(arr : number[]) {
    return arr.reduce( (a,b)=>(a + b), 0 ) / arr.length;
}
