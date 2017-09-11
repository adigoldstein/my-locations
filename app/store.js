import { createStore, combineReducers } from 'redux';

import catData from './reducers/categories'
import  bar from './reducers/bar'
// import './reducers/locations'

const reducer = combineReducers({
  catData,
  bar
});

const store = createStore(reducer);

export default store;
