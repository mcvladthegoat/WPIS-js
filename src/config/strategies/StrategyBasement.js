import { List, Map } from 'immutable';
import h from './Helpers';

export class Strategy {
    constructor(workersSheet, tasksSheet, jobs) {
        this.workersSheet = List.of(...workersSheet);
        this.workers = List.of(...workersSheet).toJS();
        this.tasksSheet = List.of(...tasksSheet);
        this.tasks = List.of(...tasksSheet).toJS();
        this.jobs = List.of(...jobs).toJS();

        this.states = new Map();
        this.realTime = 0;

        // this.startCalc = this.startCalc.bind(this);
        this.iterateModelTime = this.iterateModelTime.bind(this);

    }

    iterateModelTime(contextLink, strategyLink) { //tasksResults are passing from strategy unit!
        _ = (id) => id - 1;


        this.workers = this.workers.filter(worker => {
            worker.time += 0.1;
            const expectedTime = this.tasks[_(worker.taskId)].time || 0;
            const level = this.workersSheet[_(worker.workerId)].level || 0;

            if (h.isFinished(worker.time, expectedTime, level)) {
                this.tasks[_(worker.taskId)].status = true;
                this.tasks[_(worker.taskId)].report = {
                    workerId: worker.workerId,
                    realTime: worker.time
                };
                return false; // means for FILTER that delete from 'workers'; task done;
            }
            return true; // means to NOT to delete; task in process
        });

        // freeWorkers.length = 0; //erasing array
        this.freeWorkers = this.workersSheet.filter(ws => !this.workers.find(w => w.workerId == ws.workerId));
        ////////////////////HERE///////////////
        Promise.resolve()
            .then(() => {
                return strategyLink();
            })
            .then(() => {
                this.states.set(
                    h.getFloat(this.realTime),
                    new Map({'fw': freeWorkers, 'w': this.workers})
                );
            });

        this.realTime += 0.1;

        if(h.isProjectDone(this.tasks)) {
            return {
                name: contextLink.name,
                realTime: this.realTime,
                states: this.states
            };
        }
    }

    // startCalc() {
    //     return {
    //         realTime,
    //         status: 'No strategies found here'
    //     };
    // }
}