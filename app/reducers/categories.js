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

  switch (action.type) {

    case 'DELETE_CATEGORY':

      let newCatData = [...catData];
      for (const catId of action.catArr) {
        newCatData = newCatData.filter((category) => catId !== category.id)
      }
      console.info(newCatData);
      return newCatData;
    break;


  }

  return catData
}


