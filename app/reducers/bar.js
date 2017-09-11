const initState = {
  isView: true,
  isAdd: false,
  isEdit: false,
  isDelete: false
};

export default function categoriesReducer(bar = initState, action) {

  // if (action.type === 'ADD_TODO') {
  //   console.info(action.id, action.text);
  //   let dataCopy = [...data];
  //   dataCopy.push({id: action.id, text: action.text, done: false});
  //   return dataCopy ;
  // }

  return bar
}


