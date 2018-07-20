import availableStrategies from './strategies/index.js';
import { List } from 'immutable';

export class ModelUnit {
    constructor() {
        this.prepareAllData = this.prepareAllData.bind(this);
        this.startModeling = this.startModeling.bind(this);
        this.strategiesInstances = [];
        this.showData = this.showData.bind(this);
    }

    static getStrategiesList() {
        return availableStrategies;
    }

    static validateData(customRules = undefined) {
        return true;
    }

    prepareAllData(workersSheet, tasksSheet, jobs) {
        // if (!this.validateData()) {
        //     return;
        // }

        this.strategiesInstances = availableStrategies.map((strategyItem, key) => {
           return {
               name: strategyItem.name,
               unit: new availableStrategies[key]['unit'](workersSheet, tasksSheet, jobs)
           }
        });
    }

    showData() {
        return this.strategiesInstances.map(s => {
            return {
                name: s.name,
                data: s.unit.showData()
            }
        });
    }

    startModeling() {
        this.results = List.of(this.strategiesInstances.map(strategyItem =>
            strategyItem.unit.start()
        ));
        console.info('Final', this.results.toJS());
        return this.results;
    }
}



/**
 schemas: jobs

 **/