import React from 'react'
import {connect} from 'react-redux';

import Topbar from "../Topbar/Topbar";
import Loaction from '../location/Location'

class Locations extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCategories: [],
      nameInput: '',
      addressInput: '',
      catInput: '',
      latInput: '',
      lonInput: ''

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

  addLocationClickHandler() {
    console.info(`name: ${this.state.nameInput}, address: ${this.state.addressInput}, category: ${this.state.catInput}, lat: ${this.state.latInput}, lon: ${this.state.lonInput}`);
    this.props.addLocation(this.state.nameInput, this.state.addressInput, this.state.selectedCategories, this.state.latInput, this.state.lonInput)
  }

  addLocationView() {
    return (
      <div>
        <input onChange={(e) => this.setState({nameInput: e.target.value})} type="text" placeholder={'Name'}/>
        {this.props.cat.map((category) => {
          return <label className={'cat-list'} key={category.id}>
            <input type='checkbox'
                   checked={this.isCatChecked(category.id)}
                   onChange={(e) => this.checkUncheckCategory(e.target.checked, category.id)}
            />
            {category.name}</label>
        })}
        <input onChange={(e) => this.setState({addressInput: e.target.value})} type="text" placeholder={'Address'}/>
        <input onChange={(e) => this.setState({latInput: e.target.value})} type="text" placeholder={'Latitude'}/>
        <input onChange={(e) => this.setState({lonInput: e.target.value})} type="text" placeholder={'Longitude'}/>
        <div onClick={() => this.addLocationClickHandler()}>Add</div>
      </div>
    )
  }

  createView() {
    if (this.props.bar.isView) {
      return (
        <ul>
          {this.props.loc.map((location) => <Loaction key={location.id}
                                                      location={location}/>)}
        </ul>
      )
    } else if (this.props.bar.isAdd) {
      return this.addLocationView()
    }
  }

  componentDidMount() {
    this.props.initBar();
    // console.info(this.props.loc);
  }

  render() {
    return (
      <div>
        <Topbar title={'Locations'}/>
        {this.createView()}
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
    addLocation(name, address, catArr, lat, lon) {
      return dispatch({
        type: 'ADD_LOCATION',
        name,
        address,
        catArr,
        lat,
        lon
      })
    }

  }
}

function mapStateToProps(stateData) {
  return {
    cat: stateData.catData,
    loc: stateData.locData,
    bar: stateData.bar
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
