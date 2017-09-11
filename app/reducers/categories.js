const dummyCategories = [
  {
    id: 0,
    name: 'Bars',
  },
  {
    id: 1,
    name: 'Restaurants',
  },
  {
    id: 2,
    name: 'Malls'
  }
];

export default function categoriesReducer(catData = dummyCategories, action) {

  // if (action.type === 'ADD_TODO') {
  //   console.info(action.id, action.text);
  //   let dataCopy = [...data];
  //   dataCopy.push({id: action.id, text: action.text, done: false});
  //   return dataCopy ;
  // }

  return catData
}


