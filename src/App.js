import React, { Component, PropTypes } from 'react';
import { Button, ToggleButton, ToggleButtonGroup, ButtonToolbar, Label, Well, ListGroup } from 'react-bootstrap';

import { connect } from 'react-redux';


import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import store from "./rdx/index";
import { saveModelResults, changeModelTime } from "./rdx/actions/index";

import { WorkersTable } from "./components/WorkersTable";
import { TasksTable } from "./components/TasksTable";


import { ModelUnit } from "./config/ModelUnit";
import projectData from "./config/DummyFiller";

// Using CSS Modules mechanism
import styles from "./assets/css/style.css";

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

////////////////////////////////////////////////////////////////////////////////
class App extends Component {

  constructor(state, props) {
    super(state, props);
    this.state = {
        isModelReady: false,
        strategySelected: null,
        strategies: [],
        realTime: 0,
        sliderValue: 0
    };

    this.handle = this.handle.bind(this);
    this.renderStrategyButtons = this.renderStrategyButtons.bind(this);
    this.handleStrategyChange = this.handleStrategyChange.bind(this);
    this.startCalc = this.startCalc.bind(this);
  }

  componentDidMount() {
      this.setState({
          strategies: ModelUnit.getStrategiesList()
      });
  }

  handle(props) {
        const { value, dragging, index, ...restProps } = props;
        const { strategySelected } = this.state;

        if (this.state.sliderValue !== value) {
            this.setState({
                sliderValue: value
            });
            store.dispatch(
                changeModelTime({
                    time: value,
                    strategySelected
                })
            );
        }
        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </Tooltip>
        );
    };

  handleStrategyChange(value) {
      this.setState({
          strategySelected: value[0]
      })
  }

  renderStrategyButtons() {
      return this.state.strategies.map((strategy, key) =>
          <ToggleButton key={key} value={key} bsStyle="primary">{strategy.name}</ToggleButton>
      );
  }

  startCalc() {
      if (this.state.strategySelected === null) {
          return;
      }
      const { workersSheet, tasksSheet, jobs } = projectData;
      this.modelUnitObj = new ModelUnit();

      console.warn('Strategies available:', ModelUnit.getStrategiesList());
      this.modelUnitObj.prepareAllData(workersSheet, tasksSheet, jobs);

      const results = this.modelUnitObj.startModeling();
      console.log(results);
      this.setState({
          isModelReady: true
      });

      store.dispatch(
          saveModelResults({
              results
          })
      );
      this.forceUpdate();
  }

  render() {

    const { isModelReady, strategySelected } = this.state;
    const { results } = this.props;

    const maxSliderValue = (results) ? results[strategySelected].realTime : 0;
    const tasks = (results) ? results[strategySelected].tasks : projectData.tasksSheet;

    const wrapperStyle = { width: 'auto', margin: 10 };

    return (
      <div className={styles.bpApp}>
        <div>
          <h1>Workgroup process imitation system </h1>
        </div>
        <Well>
            {results && <div>
                <h3><Label bsStyle="primary"> Total time : {results[strategySelected].realTime} </Label>
                <Label bsStyle="success"> Current model state: {this.state.sliderValue} </Label></h3>
            </div> }
            <div style={wrapperStyle}>
                <Slider min={0} max={maxSliderValue} step={0.1} defaultValue={0} handle={this.handle} disabled={!isModelReady}/>
            </div>
            <h4>
                Available strategies:
                <ToggleButtonGroup
                    type="checkbox"
                    value={strategySelected}
                    onChange={this.handleStrategyChange}
                >
                    {this.renderStrategyButtons()}
                </ToggleButtonGroup>
                <Button onClick={this.startCalc}>Calculate</Button>
            </h4>
        </Well>
        <hr />
          <WorkersTable data={projectData.workersSheet} jobs={projectData.jobs} />
          <TasksTable data={tasks} jobs={projectData.jobs} />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    results: (state.results) ? state.results.toJS()[0] : null,
    currentModelShot: state.currentModelShot
  };
};
export default App = connect(mapStateToProps)(App);

