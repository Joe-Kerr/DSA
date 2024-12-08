import BinaryHeap, {HeapModes} from "./BinaryHeap.js";
import {push as staticArrayPush} from "../utils/array.js";
import {NumberArrayLike} from "../types.js";

/**
 * @method peek Returns the priority. | #todo make typedoc actually show this on hover!!
 */
export default class PriorityQueue extends BinaryHeap {    
    public static readonly Modes = HeapModes;

    private readonly actualValues : NumberArrayLike;

    constructor(mode : HeapModes, priorities : NumberArrayLike = []) {
        super(mode, priorities);
        this.actualValues = priorities.map(e=>e);
    }

    public enqueue(value : number, priority : number) {
        if(staticArrayPush(this.actualValues, value, this.length) === -1) {          
            return;
        }
        this.push(priority);
    }

    public dequeue() {
        const val = this.peekValue();

        if(val !== null && this.length > 0) {
            this.actualValues[0] = val;
        }

        this.pop();

        return val;
    }

    protected override swap(i1: number, i2: number): void {
        let tmp = this.arr[i1];
        this.arr[i1] = this.arr[i2];
        this.arr[i2] = tmp;    

        tmp = this.actualValues[i1];
        this.actualValues[i1] = this.actualValues[i2];
        this.actualValues[i2] = tmp;                    
    }

    public peekValue(): number | null {
        return this.length > 0 ? this.actualValues[0] ?? null : null;
    }
}