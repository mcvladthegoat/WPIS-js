import { List } from 'immutable';
import h from './Helpers';

const _ = (id) => id - 1;

export class Strategy {
    constructor(workersSheet, tasksSheet, jobs) {
        this.workersSheet = List.of(...workersSheet);
        // this.workers = List.of(...workersSheet).toJS();
        this.tasksSheet = List.of(...tasksSheet);
        this.tasks = List.of(...tasksSheet).toJS();
        this.jobs = List.of(...jobs).toJS();

        this.workers = [];
        this.freeWorkers = [];

        this.states = List();
        this._realTime = 0;

        this.start = this.start.bind(this);
        this.calc = this.calc.bind(this);
        this.showData = this.showData.bind(this);
    }

    get realTime() {
        return this._realTime;
    }

    set realTime(value) {
        this._realTime = value;
    }

    start() { //tasksResults are passing from strategy unit!
        while(!h.isProjectDone(this.tasks)) {
            this.workers = this.workers.filter(worker => {
                worker.time = (worker.time * 10 + 0.1 * 10) / 10;
                // console.log(worker);
                const expectedTime = this.tasks[_(worker.taskId)].time || 0;
                const level = this.workersSheet.toJS()[_(worker.workerId)].level || 0;

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
            this.freeWorkers = this.workersSheet.filter(ws =>
                !this.workers.find(w => w.workerId === ws.workerId)).toJS();

            this.calc();
            this.states = this.states.push(
                {'time': this.realTime, 'fw': this.freeWorkers, 'w': this.workers}
            );
            this.realTime = (this._realTime * 10 + 0.1 * 10) / 10;
            // console.log(this.realTime, this.workers);
        }

        if (h.isProjectDone(this.tasks)) {
            return {
                name: this.name,
                tasks: this.tasks,
                realTime: this.realTime,
                states: this.states.toJS()
            };
        }
    }

    showData() {
        return {
            workers: this.workers,
            tasks: this.tasks,
            jobs: this.jobs
        };
    }
}