import uuid from 'uuid';
import {defineState} from 'redux-localstore'


const dummyCategories = [
  {
    id: '6cc4f0f8-1232-4a64-b581-a72bcdcd14ce',
    name: 'Bars',
  },
  {
    id: 'e88dbdb3-49b9-410c-ace3-d49aeaa3a820',
    name: 'Restaurants',
  },
  {
    id: 'c3b7faeb-9103-4a0b-8fa1-4ec5c4f7401e',
    name: 'Malls'
  }
];
const initialState = defineState(dummyCategories)('catData');

export default function categoriesReducer(catData = initialState, action) {

  if (action.type === 'DELETE_CATEGORY') {

    let newCatData = [...catData];
    for (const catId of action.catArr) {
      newCatData = newCatData.filter((category) => catId !== category.id)
    }
    return newCatData;
  }

  if (action.type === 'EDIT_CATEGORY') {
    let newCatData = [...catData];
    for (const item of newCatData) {
      if (item.id === action.id) {
        item.name = action.newName
      }
    }
    return newCatData
  }

  if (action.type === 'ADD_CATEGORY') {
    let newCatData = [...catData];
    newCatData.push({id: uuid(), name: action.newName});
    return newCatData
  }

  return catData
}


