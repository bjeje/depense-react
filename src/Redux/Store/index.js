import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import reducers from '../Reducers';

const spentStore = createStore(
                        reducers,
                        applyMiddleware(thunk)
                    );

export default spentStore;

