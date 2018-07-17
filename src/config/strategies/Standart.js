import { Strategy } from './StrategyBasement';

const name = 'Standart';

class StandartStrategy extends Strategy {
    constructor(...params) {
        super(...params);
        this.startCalc = this.startCalc.bind(this);
        this.start = this.start.bind(this);
        this.localResults = [];
    }

    start() {
        return super.iterateModelTime(this, this.startCalc);
    }

    startCalc() {
        /*
        * VARIANT 1
        * First free worker take task if jobIds are equal
        */
        super.freeWorkers.map(fw => {
            const task = super.tasks.find(t =>
                t.jobId == fw.jobId &&
                !t.status && !super.workers.find(w => w.taskId == t.taskId)
            );
            if (task) {
                super.workers.push({workerId: fw.workerId, taskId: task.taskId, time: 0});
            }
        });
    };
}


export default {
    name,
    unit: StandartStrategy
};