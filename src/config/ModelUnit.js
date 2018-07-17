import availableStrategies from './strategies/index.js';
import { List } from 'immutable';

export class ModelUnit {
    constructor() {
        this.prepareAllData = this.prepareAllData.bind(this);
        this.startModeling = this.startModeling.bind(this);
        this.syncModeling = this.syncModeling.bind(this);
        this.strategiesInstances = [];
        this.results;
    }

    static getStrategiesList() {
        return availableStrategies;
    }

    static validateData(customRules = undefined) {
        return true;
    }

    prepareAllData(workersSheet, tasksSheet, jobs) {
        if (!this.validateData()) {
            return;
        }

        this.strategiesInstances = availableStrategies.map((strategyItem, key) => {
           return {
               name: strategyItem.name,
               unit: new availableStrategies[key]['unit'](workersSheet, tasksSheet, jobs)
           }
        });
    }

    syncModeling(model) {}

    startModeling() {
        let tempResults = this.strategiesInstances.map((strategyItem, k) => {
            return strategyItem.unit.start();
        });

        console.log('final results', tempResults);

        this.results = List.of(tempResults); //saved securely as immutable list
    }
}



/**
 schemas: jobs

 **/