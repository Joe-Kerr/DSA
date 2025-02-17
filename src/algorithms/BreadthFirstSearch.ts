export interface IGetGraphNeighbours {
    /**@deprecated Data structure to be decided - apparently performance of sets not too great */
    addNeighboursToRef(node : number, neighbours : Set<number>) : void
}

//#todo performance tests
export function breadthFirstSearchFind(start : number, find : number, graph : IGetGraphNeighbours) {
    const front : number[] = [start];
    /**@alias visited */
    const links = {};
    const path : number[] = [];
    const neighbours = new Set<number>();

    let curNode : number|undefined = 0;
    let neighNode = 0;
    let safety = 10_000;
    while(true && safety-- >= 0) {
        //Dequeue
        curNode = front.shift();

        if(curNode === undefined || curNode === find) {         
            break;
        }

        graph.addNeighboursToRef(curNode, neighbours);

        for(neighNode of neighbours) {
            //  neighNode == unvisited
            if(links[neighNode] === undefined) {
                front.push(neighNode);
                //Need to backtrack!
                //links[curNode] = neighNode;
                links[neighNode] = curNode;
            }            
        }

        neighbours.clear();
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