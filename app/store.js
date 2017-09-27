import { createStore, combineReducers } from 'redux';
import storeSynchronize from 'redux-localstore'

import catData from './reducers/categories'
import  bar from './reducers/bar'
import locData from './reducers/locations'

const reducer = combineReducers({
  catData,
  locData,
  bar
});

export const store = createStore(reducer);
export default store;


console.info('store');
storeSynchronize(store);
