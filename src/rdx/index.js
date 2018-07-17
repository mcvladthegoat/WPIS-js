import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const composeEnhancers = composeWithDevTools({
    name: 'MyApp', actionsBlacklist: ['REDUX_STORAGE_SAVE']
});


// const store = createStore(rootReducer, enhancer);

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger),));

    // other store enhancers if any


export default store;
