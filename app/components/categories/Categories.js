import React from 'react'
import {connect} from 'react-redux';

import Topbar from "../Topbar/Topbar";
import './categories.css'

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCategories: [],
      editDisplay: false,
      editValue: {},
      editInput: '',
      addInput: ''
    }
  }

  checkUncheckCategory(isChecked, id) {

    if (isChecked) {
      //need to add to state
      const newCategories = [...this.state.selectedCategories];
      newCategories.push(id);
      this.setState({selectedCategories: newCategories})
    } else {
      //need to remove from state
      let newCategories = this.state.selectedCategories.filter((catId) => catId !== id);
      this.setState({selectedCategories: newCategories});
    }
  }

  isCatChecked(id) {
    for (const selectedId of this.state.selectedCategories) {
      if (selectedId === id) {
        return true
      }
    }
    return false
  }

  createEditBtn(id) {
    return this.props.bar.isEdit ?
      <div id={id} className={'edit-btn btn'} onClick={(e) => this.editCategoryClickHandler(e)}>Edit</div> : null;
  }

  editCategoryClickHandler(e) {
    const idToEdit = e.target.getAttribute('id');
    const editVal = this.props.cat.find((catObj) => catObj.id.toString() === idToEdit);
    console.info(editVal);
    this.setState({editDisplay: true, editValue: editVal, editInput: editVal.name})
  }

  addCategoryClickHandler() {
    if (this.state.addInput !== '') {
      this.props.addCategory(this.state.addInput);
      this.props.initBar();
      this.setState({addInput:''});
    }
  }

  createCategoryView() {
    if (this.props.bar.isDelete) {
      return (
        this.props.cat.map((category) => {
          return <label className={'checkbox-list'} key={category.id}>
            <input type='checkbox' checked={this.isCatChecked(category.id)}
                   onChange={(e) => this.checkUncheckCategory(e.target.checked, category.id)}/>
            {category.name}</label>
        })
      )
    } else if (this.props.bar.isAdd) {
      return (
        <div className={'add-category'}>
          <input className={'add-input'} type="text" onChange={(e) => this.setState({addInput: e.target.value})}
                 placeholder={'Insert new category name here'}/>
          <div className={'btn'} onClick={() => this.addCategoryClickHandler()}>Add categoty</div>
        </div>
      )
    } else {
      return (
        <ul className={'view-list'}>
          {this.props.cat.map((category) => {
            return <li className={'view-item'} key={category.id}>
              <div className={'category-name'}>{category.name}</div>
              {this.createEditBtn(category.id)}
            </li>
          })}
        </ul>
      )
    }
  }

  createButton() {
    if (this.props.bar.isDelete && this.state.selectedCategories.length > 0) {
      return (
        <div className={'delete-btn btn'} onClick={() => this.deleteCategories()}>Delete</div>
      )
    }
  }

  editSaveChanges() {
    this.props.editCategory(this.state.editValue.id, this.state.editInput);
    this.setState({editDisplay: false, editInput: ''})
  }

  createEditForm() {
    if (this.state.editDisplay) {
      return (
        <div>
          <input type="text" onChange={(e) => this.setState({editInput: e.target.value})}
                 defaultValue={this.state.editValue.name}/>
          <div onClick={() => this.editSaveChanges()}>save changes</div>
        </div>
      )
    }
  }

  deleteCategories() {
    console.info('delete');
    this.props.deleteCat(this.state.selectedCategories);
    this.setState({selectedCategories:[]});
  }

  componentDidMount() {
    this.props.initBar()
  }

  render() {
    return (
      <div>
        <Topbar title={'Categories'}/>

        {this.createEditForm()}
        {this.createCategoryView()}
        {this.createButton()}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initBar() {
      return dispatch({
        type: 'INIT_BAR',
      })
    },
    deleteCat(catArr) {
      return dispatch({
        type: 'DELETE_CATEGORY',
        catArr
      })
    },
    editCategory(id, newName) {
      return dispatch({
        type: 'EDIT_CATEGORY',
        id,
        newName
      })
    },
    addCategory(newName) {
      return dispatch({
        type: 'ADD_CATEGORY',
        newName
      })
    }
  }
}

function mapStateToProps(stateData) {
  return {
    cat: stateData.catData,
    bar: stateData.bar
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
