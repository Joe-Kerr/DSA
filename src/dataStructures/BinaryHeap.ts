import {push as staticArrayPush} from "../utils/array.js";
import {NumberArrayLike} from "../types.js";

export enum HeapModes {Min, Max};

type Comparator = (array : ArrayLike<number>, i1 : number, i2 : number)=>(boolean)

const compareMinHeap : Comparator = function(array : ArrayLike<number>, i1 : number, i2 : number) {
    return array[i1] < array[i2]; 
};

const compareMaxHeap : Comparator = function(array : ArrayLike<number>, i1 : number, i2 : number) {
    return array[i1] > array[i2];
};

/**@description The one important heap structural property is that both (assuming binary tree) 
 * child nodes must be smaller than their parent node (in case of max-heap; vice versa for min-heap). */
export default class BinaryHeap {
    public static readonly Modes = HeapModes;

    protected readonly arr : NumberArrayLike;

    private readonly compare : Comparator;
    private _length = 0;

    constructor(mode : HeapModes, array : NumberArrayLike = []) {
        const modes = {
            [HeapModes.Min]: compareMinHeap,
            [HeapModes.Max]: compareMaxHeap,
        };

        this.compare = modes[mode] || compareMaxHeap;

        this.arr = array;
    }

    private get capacity() { return this.arr.length; }
    
    public get length() { return this._length; }

    public peek() : number|null {
        return this._length === 0 || this.arr[0] === undefined ? null : this.arr[0];
    }

    public push(node : number) {        
        let i = staticArrayPush(this.arr, node, this._length);

        if(i === -1) {
            return -1;
        }

        this._length++;

        let p = 0;
        let safety = this._length;

        while(i !== 0 && safety-- >= 0) {
            p = this.getParentIndex(i);

            if(this.compare(this.arr, p, i) === true || this.arr[p] === this.arr[i]) {
                break;
            }

            this.swap(p, i);

            i = p;
        }

        return i;
    }

    public pop() : number|null {
        const returns = this.peek();

        this._length--;

        const len = this._length;   
        const start = this.arr[len];

        if(returns === null || start === undefined) {
            return null;
        }
        else if(len === 0) {
            return start; //== returns
        }

        this.arr[0] = start;

        let i = 0;
        let l = 0, r = 0, max = 0;
        let safety = len;
        
        while(safety-- >= 0) {
            max = i;
            l = this.getLeftIndex(i);
            r = this.getRightIndex(i);
    
            if(l < len && this.compare(this.arr, l, r) === true) {
                max = l
            }
            else if(r < len && this.compare(this.arr, r, l) === true) {
                max = r;
            }

            if(max !== i) {
                this.swap(i, max);
                i = max;                
            }
            else {
                break;
            }
        }

        return returns;
    }

    protected swap(i1 : number, i2 : number) {
        const tmp = this.arr[i1];
        this.arr[i1] = this.arr[i2];
        this.arr[i2] = tmp;        
    }

    //#todo use bit shifts / then get rid of fn calls?
    private getParentIndex(index : number) {
        return Math.floor( (index-1) / 2 );
    }

    private getLeftIndex(index : number) {
        return Math.floor( (2 * index) + 1 );
    }

    private getRightIndex(index : number) {
        return Math.floor( (2 * index) + 2 );
    }
}