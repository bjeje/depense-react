import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import reducers from '../Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// const spentStore = createStore(
//                         reducers,
//                         applyMiddleware(thunk),
//                     );

const spentStore = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);

export default spentStore;

