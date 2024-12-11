import assert from "node:assert";
import {computePath} from "../../js/src/algorithms/Astar.js";
import Grid from "../../js/src/dataStructures/Grid.js";

suite("Astar");

class UnitTestGrid extends Grid {
	getNeighbours(tile) {
		const neighbours = super.getNeighbours(tile);
		
        let neighId = -1;
        for (let i = 0; i < 8; i++) {
            neighId = neighbours[i];
			
			const cell = this.grid[neighId];
			
			if(cell === 1) {
				neighbours[i] = -1;
			}
		}

		return neighbours;
	}	
}

function convertStringToGrid(gridGenRaw) {
	const r = gridGenRaw.indexOf("\r");
	const n = gridGenRaw.indexOf("\n");
	const rn = gridGenRaw.indexOf("\r\n");
	
	const width = [r,n,rn].filter((v)=>(v != -1)).sort(/*asc*/).shift();
	const gridGen = gridGenRaw.replace(/(\r\n|\n|\r)/gm, "");
	const height = gridGen.length / width;

	const gridArr = new Int16Array(gridGen.length);
	for(let i=0; i<gridGen.length; i++) {
		gridArr[i] = parseInt(gridGen[i]);
	}
	
	const grid = new UnitTestGrid(width, height, gridArr);

	return grid;
}

test("Astar.computePath", ()=>{
const gridGenRaw = `\
x0100
0x1x0
00x00
00111
`
	const grid = convertStringToGrid(gridGenRaw);
	const path = computePath(0, 8, grid);
		
	assert.deepEqual(path, [0, 6, 12, 8]);
	
});

test("Astar.computePath - empty grid", ()=>{
	const grid = new UnitTestGrid(0, 0, []);
	const path = computePath(0, 8, grid);
		
	assert.deepEqual(path, []);
});

test("Astar.computePath - start == goal", ()=>{
const gridGenRaw = `\
00
00
`
	const grid = convertStringToGrid(gridGenRaw);
	const path = computePath(1, 1, grid);
		
	assert.deepEqual(path, []);	
});

test("Astar.computePath - unreachable", ()=>{
const gridGenRaw = `\
010
010
010
`
	const grid = convertStringToGrid(gridGenRaw);
	const path = computePath(3, 8, grid);
		
	assert.deepEqual(path, []);		
});

test("Astar.computePath - start blocked", ()=>{
const gridGenRaw = `\
10
00
`
	const grid = convertStringToGrid(gridGenRaw);
	const path = computePath(0, 3, grid);
		
	assert.deepEqual(path, []);			
});

test("Astar.computePath - goal blocked", ()=>{
const gridGenRaw = `\
00
01
`
	const grid = convertStringToGrid(gridGenRaw);
	const path = computePath(0, 3, grid);
		
	assert.deepEqual(path, []);			
});