import { Strategy } from './StrategyBasement';

const name = 'Reliable';

class ReliableStrategy extends Strategy {
    constructor(...params) {
        super(...params);
        this.startCalc = this.startCalc.bind(this);
        this.name = name;
        this.localResults = [];
    }

    startCalc() {
        /*
         * VARIANT 3
         * Find free worker with greatest level
        */
        let tasksSorted = super.tasks.filter(t => !t.status).sort((a, b) => b.time - a.time);
        let freeWSorted = super.freeWorkers.sort((a, b) => b.level - a.level);

        // //console.log('tasksSorted', tasksSorted);
        // // console.log('freeWSorted', freeWSorted);


        for(let i = 0; i < tasksSorted.length; i++) {
            for(let j = i; j< freeWSorted.length; j++) {
                if(freeWSorted[j].jobId === tasksSorted[i].jobId){
                    super.workers.push({workerId: freeWSorted[j].workerId, taskId: tasksSorted[i].taskId, time: 0});
                    let index = super.freeWorkers.findIndex(a => a.workerId === freeWSorted[j].workerId);
                    super.freeWorkers.splice(index, 1);
                    break;
                }
            }
        }
    }
}


export default {
    name,
    unit: ReliableStrategy
};