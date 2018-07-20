// src/js/reducers/index.js

import {Map, Set} from "immutable";

import { ActionType } from "../constants/action-types";

const initialState = {
  results: null,
  currentModelShot: {},
};

const rootReducer = (state = initialState, action) => {

  switch (action.type) {

      case ActionType.SAVE_MODEL_RESULTS:
        return {
            ...state,
            results: action.payload.results
        };

      case ActionType.CHANGE_MODEL_TIME:
        return {
            ...state,
            currentModelShot: state.results.toJS()[action.payload.strategySelected].states[action.payload.time * 10] || []
        };

    default:
      return state;
  }

};

export default rootReducer;
