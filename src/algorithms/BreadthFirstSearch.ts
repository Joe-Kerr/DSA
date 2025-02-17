export interface IGetGraphNeighbours {
    /**Ensure only unique elements are added - not (yet) checked */
    addNeighboursToRef(node : number, neighbourArray : number[]) : void
}

//#todo performance tests
export function breadthFirstSearchFind(start : number, find : number, graph : IGetGraphNeighbours) {
    const front : number[] = [start];
    /**@alias visited */
    const links = {};
    const path : number[] = [];

    let curNode : number|undefined = 0;
    let neighNode = 0;
    let safety = 10_000;
    while(true && safety-- >= 0) {
        //Dequeue
        curNode = front.shift();

        if(curNode === undefined || curNode === find) {         
            break;
        }

        graph.addNeighboursToRef(curNode, front);

        for(let i=0; i<front.length; i++) {
            neighNode = front[i];
            
            //  neighNode == unvisited
            if(links[neighNode] === undefined) {
                front.push(neighNode);
                //Need to backtrack!
                //links[curNode] = neighNode;
                links[neighNode] = curNode;
            }
        }
    }

    if(safety <= 0) {
        console.error("INF LOOP DETECTED");
        curNode = undefined;
    }

    safety = 10_000;
    if(curNode === find) {
        let step : number|undefined = find;
        while(step !== undefined && safety-- >= 0) {
            //#todo is this possible? Need unit test to trigger this branch
            if(path.includes(step) === true) {
                path.length = 0;
                console.error("BFS backtracked into cyclical path");
                break;
            }

            path.unshift(step);        
            step = links[step];

            if(step === start) {
                path.unshift(step);     
                break;
            }
        }        
    }

    if(safety <= 0) {
        console.error("INF LOOP DETECTED 2");
        path.length = 0;
    }
    

    return path;
}