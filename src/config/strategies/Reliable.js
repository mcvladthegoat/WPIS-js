import { Strategy } from './StrategyBasement';

const name = 'Reliable';

class ReliableStrategy extends Strategy {
    constructor(...params) {
        super(...params);
        this.calc = this.calc.bind(this);
        this.name = name;
    }

    calc() {
        /*
         * VARIANT 3
         * Find free worker with greatest level
        */
        let tasksSorted = this.tasks.filter(t => !t.status).sort((a, b) => b.time - a.time);
        let freeWSorted = this.freeWorkers.sort((a, b) => b.level - a.level);

        for(let i = 0; i < tasksSorted.length; i++) {
            for(let j = i; j< freeWSorted.length; j++) {
                if(freeWSorted[j].jobId === tasksSorted[i].jobId){
                    this.workers.push({workerId: freeWSorted[j].workerId, taskId: tasksSorted[i].taskId, time: 0});
                    let index = this.freeWorkers.findIndex(a => a.workerId === freeWSorted[j].workerId);
                    this.freeWorkers.splice(index, 1);
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