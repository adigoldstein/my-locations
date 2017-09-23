import { createStore, combineReducers } from 'redux';

import catData from './reducers/categories'
import  bar from './reducers/bar'
import locData from './reducers/locations'
const reducer = combineReducers({
  catData,
  locData,
  bar
});

const store = createStore(reducer);

export default store;
