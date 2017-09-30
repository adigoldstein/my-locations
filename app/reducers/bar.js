const initState = {
  isView: true,
  isAdd: true,
  isEdit: true,
  isDelete: true
};

export default function categoriesReducer(bar = initState, action) {

  switch (action.type) {
    case 'INIT_BAR':
    case'ACTIVE_VIEW':
      return {
        isView: true,
        isAdd: false,
        isEdit: false,
        isDelete: false
      };
      break;

    case 'ACTIVE_ADD':
      return {
        isView: false,
        isAdd: true,
        isEdit: false,
        isDelete: false
      };
      break;

    case 'ACTIVE_EDIT':
      return {
        isView: false,
        isAdd: false,
        isEdit: true,
        isDelete: false
      };
      break;

    case 'ACTIVE_DELETE':
      return {
        isView: false,
        isAdd: false,
        isEdit: false,
        isDelete: true
      };
      break;
  }

  return bar
}


