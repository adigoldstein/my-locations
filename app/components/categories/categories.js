import React from 'react'
import {connect} from 'react-redux';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCategories: []
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
      console.info(newCategories);
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

    return this.props.bar.isEdit ? <div key={id}>Edit</div> : null;


  }

  createCategoryView() {
    if (this.props.bar.isDelete) {
      return (
        this.props.cat.map((category) => {
          return <label key={category.id}>
            <input type='checkbox' checked={this.isCatChecked(category.id)}
                   onChange={(e) => this.checkUncheckCategory(e.target.checked, category.id)}/>
            {category.name}</label>
        })
      )

    } else {
      return (
        <ul>
          {this.props.cat.map((category) => {
            return <div key={category.id}>
              <div>{category.name}</div>
              {this.createEditBtn(category.id)}
              </div>
          })}
        </ul>
      )
    }
  }

  createButton() {
    if (this.props.bar.isDelete && this.state.selectedCategories.length > 0) {
      return (
        <div onClick={()=> this.deleteCategories()}>Delete</div>
      )
    }
  }

  deleteCategories() {
    console.info('delete');
    this.props.deleteCat(this.state.selectedCategories);
  }

  componentDidMount() {
    this.props.initBar()
  }

  render() {
    return (
      <div>
        <h1>Category</h1>
        {this.createButton()}
        {this.createCategoryView()}
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
