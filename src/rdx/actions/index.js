// src/js/actions/index.js
import { ActionType } from "../constants/action-types";

export const saveModelResults = results => ({
    type:ActionType.SAVE_MODEL_RESULTS,
    payload: results
});

export const changeModelTime = data => ({
    type:ActionType.CHANGE_MODEL_TIME,
    payload: data
});

