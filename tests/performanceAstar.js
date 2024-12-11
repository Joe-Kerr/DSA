import Measurement from "./performanceCommon.js";
import "./performance/Babylon.min.js";
import Recast from "./performance/Recast.js";
import {computePath as computePathWithAstar} from "../js/src/algorithms/Astar.js";
import Grid from "../js/src/dataStructures/Grid.js";

// See also https://playground.babylonjs.com/#88CB6A#158
// -32,-32 -> 32,32
import navmesh from "./performance/navmesh.js";

///////////////////////////
const ARRAY_SIZE = 10_000;
const SPIN_UP = 1_000;
const SAMPLES = 1_000;
///////////////////////////

const baby = await setupBabylon();
const astarGrid = createGrid();
const measurement = new Measurement();
measurement.SAMPLES = SAMPLES;
measurement.SPIN_UP = SPIN_UP;

measurement.measure("Babylon navmesh - long path", ()=>{
	baby.computePath(-32,-32,32,32);
});

measurement.measure("Babylon navmesh - short path", ()=>{
	baby.computePath(-32,-32, -22,-22);
});

measurement.measure("Astar own - long path", ()=>{
	computePathWithAstar(0, 64*64-1, astarGrid);
});

measurement.measure("Astar own - short path", ()=>{
	computePathWithAstar(0, 10*64+10, astarGrid);
});

measurement.printStats();
baby.destroy();

// -----------------------------------------------------

async function setupBabylon() {
	await Recast();
	
	const engine = new BABYLON.NullEngine();
    const scene = new BABYLON.Scene(engine);
	
	const navigationPlugin = new BABYLON.RecastJSPlugin();
	const parameters = {
	  cs: 0.2,
	  ch: 0.2,
	  walkableSlopeAngle: 35,
	  walkableHeight: 1,
	  walkableClimb: 1,
	  walkableRadius: 1,
	  maxEdgeLen: 12,
	  maxSimplificationError: 1.3,
	  minRegionArea: 8,
	  mergeRegionArea: 20,
	  maxVertsPerPoly: 6,
	  detailSampleDist: 6,
	  detailSampleMaxError: 1,
	};	
	
	const validNavmeshRaw = navmesh.split(",").map((el)=>parseInt(el));
	const uint8array = Uint8Array.from(validNavmeshRaw);
	navigationPlugin.buildFromNavmeshData(uint8array);
	
	const start = new BABYLON.Vector3(-32, 0, -32);
	const goal = new BABYLON.Vector3(32, 0, 32);
	
	return {
		computePath: (fromX,fromY, toX,toY)=>{
			start.set(fromX, 0, fromY);
			goal.set(toX, 0, toY);
			const pathPoints = navigationPlugin.computePath(navigationPlugin.getClosestPoint(start), navigationPlugin.getClosestPoint(goal));
			
		},
		destroy: ()=>{
			navigationPlugin.dispose();
			scene.dispose();
			engine.dispose();
		}
	};
}

function createGrid() {
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
	const navgrid = new Uint8Array(64*64);
	navgrid.fill(0);
	
	const grid = new UnitTestGrid(64,64, navgrid);	
	
	// Walls
	for(let v=1; v<63; v++) {
		const x = 31;
		const y = v;
		const i = y * 64 + x;
		navgrid[i] = 1;
	}	
	
	for(let h=1; h<63; h++) {
		const x = h;
		const y = 31;
		const i = y * 64 + x;
		navgrid[i] = 1;
	}
	
	//for(let i=0; i<64; i++) { console.log( navgrid.slice(i*64, i*64+64).toString().replace(/,/g,"") ); }
		
	return grid;
}