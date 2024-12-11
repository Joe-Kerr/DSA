import {NumberArrayLike} from "../types.js";

enum CardinalDirections {N=0, E=1, S=2, W=3, NE=4, SE=5, SW=6, NW=7};

//#todo naming
enum GridTraversalMode {
    Exact,              //Euclidean / 1 diagoanl <  2 cells
    DiagonalCountsTwo,  //Manhatten / 1 diagonal == 2 cells 
}

function distanceEuclidean2d(x1 : number, y1 : number, x2 : number, y2 : number) {
    return Math.sqrt( (x1 - x2) + (y1 - y2));
}

function distanceManhatten2d(x1 : number, y1 : number, x2 : number, y2 : number) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export default class Grid {
    private readonly width: number;
    private readonly height: number;
    protected readonly grid : NumberArrayLike;
    private readonly _stepCost : number = 1;

    //N.B. Memory overhead of ArrayBuffers > Array.
    private readonly tmpCoords : Array<number> = new Array(2);
    protected readonly neighbourCache: Array<number> = new Array(8);

    private readonly distanceFunction = distanceManhatten2d;

    constructor(width : number, height : number, dataGrid : NumberArrayLike = []) {
        this.width = width;
        this.height = height;
        this.grid = dataGrid;
    }

    public get stepCost() { return this._stepCost; }

    public getNeighbours(tile : number) {
        const [x, y] = this.getCoordinatesByTileToClassCache(tile);

        this.neighbourCache[CardinalDirections.N] = tile - this.width; //N    
        this.neighbourCache[CardinalDirections.E] = tile + 1; //E
        this.neighbourCache[CardinalDirections.S] = tile + this.width; //S
        this.neighbourCache[CardinalDirections.W] = tile - 1; //W

        this.neighbourCache[CardinalDirections.NE] = tile - this.width + 1; //NE        
        this.neighbourCache[CardinalDirections.SE] = tile + this.width + 1; //SE        
        this.neighbourCache[CardinalDirections.SW] = tile + this.width - 1; //SW        
        this.neighbourCache[CardinalDirections.NW] = tile - this.width - 1; //NW
        
        //on west edge, therefore no west neighbours
        if (x === 0) {
            this.neighbourCache[CardinalDirections.W] = -1;
            this.neighbourCache[CardinalDirections.SW] = -1;
            this.neighbourCache[CardinalDirections.NW] = -1;
        }
        //on east edge, therefore no east neighbours
        else if (x === this.width - 1) {
            this.neighbourCache[CardinalDirections.E] = -1;
            this.neighbourCache[CardinalDirections.NE] = -1;
            this.neighbourCache[CardinalDirections.SE] = -1;
        }        

        //on north edge, therefore no north neighbours
        if (y === 0) {
            this.neighbourCache[CardinalDirections.N] = -1;
            this.neighbourCache[CardinalDirections.NE] = -1;
            this.neighbourCache[CardinalDirections.NW] = -1;
        }

        //on south edge, therefore no south neighbours
        else if (y === this.height - 1) {
            this.neighbourCache[CardinalDirections.S] = -1;
            this.neighbourCache[CardinalDirections.SE] = -1;
            this.neighbourCache[CardinalDirections.SW] = -1;
        }  
        
        let neighId = -1;
        for (let i = 0; i < 8; i++) {
            neighId = this.neighbourCache[i];

            if (neighId !== -1 && this.checkIsTileWithinGrid(neighId) === false) {
                this.neighbourCache[i] = -1;
            }
        }

        return this.neighbourCache;
    }

    public getDistanceBetween(a: number, b: number) {
        const [va0, va1] = this.getCoordinatesByTileToClassCache(a);
        const vb = this.getCoordinatesByTileToClassCache(b);

        return this.distanceFunction(va0, va1, vb[0], vb[1]);
    }

    private checkIsTileWithinGrid(tile: number) {
        const coords = this.getCoordinatesByTileToClassCache(tile);
        
        if (coords[0] < 0 || coords[0] > this.width - 1) {
            return false;
        }

        if (coords[1] < 0 || coords[1] > this.height - 1) {
            return false;
        }

        return true;
    }

    private getCoordinatesByTileToClassCache(tile: number) {
        const y = Math.floor(tile / this.width);
        const x = tile - y * this.width;
        this.tmpCoords[0] = x;
        this.tmpCoords[1] = y;

        return this.tmpCoords;
    }
}