import type SingleLinkedList from "../SingleLinkedList.js";

export function convertSingleLinkedListToArray<Type>(list : SingleLinkedList<Type>) : Array<Type> {
    const result = new Array<Type>(list.length);
    list.iterate((val, i)=>{
        result[i] = val;
    });
    return result;
}