import { Strategy } from './StrategyBasement';

const name = 'Standart';

class StandartStrategy extends Strategy {
    constructor(...params) {
        super(...params);
        this.calc = this.calc.bind(this);
        this.name = name;
    }


    calc() {
        /*
        * VARIANT 1
        * First free worker take task if jobIds are equal
        */
        this.freeWorkers.map(fw => {
            const task = this.tasks.find(t =>
                t.jobId == fw.jobId &&
                !t.status && !this.workers.find(w => w.taskId == t.taskId)
            );
            if (task) {
                this.workers.push({workerId: fw.workerId, taskId: task.taskId, time: 0});
            }
        });
    };
}


export default {
    name,
    unit: StandartStrategy
};