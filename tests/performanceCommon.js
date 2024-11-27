export default class Measure {
    stats = {};
    masterTestArray = [];

    SPIN_UP = 1_000;
    SAMPLES = 1_000;

    fillTestArray = ()=>{}
    prepareTestArray = ()=>{}

    measure(key, fn) {
        const stats = this.stats;
        const SPIN_UP = this.SPIN_UP;
        const SAMPLES = this.SAMPLES;

        if(this.masterTestArray.length === 0) {
            this.fillTestArray();
        }

        for(let i=0; i<SPIN_UP; i++) {
            const testArray =  this.prepareTestArray();
            fn(testArray);
        }
        
        const times = [];
        let iterations = 0;
        
        for(let i=0; i<SAMPLES; i++) {
            const testArray =  this.prepareTestArray();
            const before = performance.now();		
            fn(testArray);
            times.push(performance.now()-before);
            
            iterations++;
        }	
        
        times.sort((a,b)=>(a-b));
        
        stats[key] = {
            iterations,
            top1: times[0].toFixed(5),
            top2: times[1].toFixed(5),
            top3: times[2].toFixed(5),
            
        };        
    }

    printStats() {
        const measurement = this;
        
        for(const id in measurement.stats) {
            const set = measurement.stats[id];
            
            console.log(id);
            console.log("\t", set.top1, "\t", set.top2, "\t", set.top3, "\t");
        }        
    }
}