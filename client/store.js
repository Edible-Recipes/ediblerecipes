import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';

//===================================================================================================
//DID NOT USE THE STORE WHATSOEVER. HAD AN IDEA TO USE REDUX BUT DECIDED NOT TO WHEN REFINING SCOPE.
//===================================================================================================

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(reducers, composeWithDevTools());

console.log(store.getState());

export default store;
