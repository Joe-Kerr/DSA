//#todo fibo heap should be faster
import PriorityQueue from "../dataStructures/PriorityQueue.js";

interface IGrid {
    get stepCost() : number;
    getNeighbours(tile : number) : number[]
    getDistanceBetween(from : number, to : number) : number;
}

export function computePath(startNode : number, goalNode : number, grid : IGrid) {
    // aka openList
    const frontier = new PriorityQueue(PriorityQueue.Modes.Min);

    // aka closedList
    const pathHistory = {[startNode]: -1};
    const cellCosts = {[startNode]: 0};

    let i = 0;
    let totalEstCosts = 0;
    let curNode = -1;
    let neigh = -1;
    let costsSoFar = 0;
    let estCostCurToGoal = 0;
    let newTotalCosts = 0;
    let neightbours : number[] = [];

    //Init
    frontier.enqueue(startNode, 0);

    main:while(frontier.length > 0) {
        totalEstCosts = frontier.peek()!;
        curNode = frontier.dequeue()!;

        //#todo #bug TypeScript did not complain about missing null check of curNode
        if(curNode === null || totalEstCosts === null) {
            break;
        }
        
        neightbours = grid.getNeighbours(curNode);
      
        //console.log(curNode, totalEstCosts)

        for(i=0; i<8; i++) {
            neigh = neightbours[i];

            if(neigh === -1) {
                continue;
            }

            if(neigh === goalNode) {
                pathHistory[neigh] = curNode;               
                break main;                
            }

            costsSoFar = cellCosts[curNode] + grid.stepCost;
            estCostCurToGoal = grid.getDistanceBetween(neigh, goalNode);
            newTotalCosts = costsSoFar + estCostCurToGoal;
            
            if(pathHistory[neigh] === undefined || newTotalCosts < totalEstCosts) {
                //console.log("  *", neigh, newTotalCosts)               
                pathHistory[neigh] = curNode;
                cellCosts[neigh] = costsSoFar;
                frontier.enqueue(neigh, newTotalCosts);
                totalEstCosts = newTotalCosts;
            }
        }
    }
    //console.log(closedList)
    return closedListToPathArray(pathHistory, startNode, goalNode);
}

function closedListToPathArray(list : {[key : number]: number}, start : number, goal : number) {
    const path : number[] = [];

    //grid.pushValidGoalTileToRef(goal, path);

    path.push(goal);
    let current = goal;
  
    while(current !== start) {
        if(list[current]) {
            path.push(list[current]);
        }
        else {
            break;
        }
        
        current = list[current];
    }

    if(path.length === 1) {
        path.pop();
    }
    else {
        path.push(start);
        path.reverse();
    }

    return path;    
}