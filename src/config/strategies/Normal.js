import { Strategy } from './StrategyBasement';

const name = 'Normal';

class NormalStrategy extends Strategy {
    constructor(...params) {
        super(...params);
        this.calc = this.calc.bind(this);
        this.start = this.start.bind(this);
        this.name = name;
    }

    calc() {
         /*
         * VARIANT 2
         * Find the absolute minimum distance btwn worker level and task time
         * and jobIds are equal
         */
       this.tasks.filter(t => !t.status).map(task => {
            let candidates = [];
            this.freeWorkers.map(fw => {
                if (fw.jobId === task.jobId) {
                    candidates.push({ workerId: fw.workerId, dist: Math.abs(task.time - fw.level)})
                }
            });
            candidates.sort((a, b) => b.dist - a.dist);
            if(candidates[0]) {
                this.workers.push({workerId: candidates[0].workerId, taskId: task.taskId, time: 0});
                let index = this.freeWorkers.findIndex(a => a.workerId === candidates[0].workerId);
                this.freeWorkers.splice(index, 1);
            }
        });
    };
}


export default {
    name,
    unit: NormalStrategy
};