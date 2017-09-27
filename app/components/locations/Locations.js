import React from 'react'
import {connect} from 'react-redux';

import Topbar from "../Topbar/Topbar";
import Loaction from '../location/Location'
import './locations.css'

class Locations extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCategories: [],
      nameInput: '',
      addressInput: '',
      catInput: '',
      latInput: '',
      lonInput: '',
      deleteSelectedLocs: [],
      showError : false

    }
  }

  deleteLocationsClickHandler() {
    this.props.deleteLocations(this.state.deleteSelectedLocs);
    this.setState({deleteSelectedLocs: []}, this.props.initBar);

  }

  deleteBtn() {
    if (this.state.deleteSelectedLocs.length > 0) {
      return <div onClick={() => this.deleteLocationsClickHandler()} className={'btn del-loc-btn'}>Delete</div>
    }
  }

  deleteDisplayer() {
    return (
      <div className={'delete-container'}>
        {this.props.loc.map((location) => {
          return <label className={'checkbox-list'} key={location.id}>
            <input type='checkbox'
                   checked={this.isCatChecked(location.id, this.state.deleteSelectedLocs)}
                   onChange={(e) => this.checkUncheckCategory(e.target.checked, location.id, this.state.deleteSelectedLocs, 'delete')}
            />
            {location.name}</label>
        })}
        {this.deleteBtn()}
      </div>
    )
  }

  isCatChecked(id, arrToCheck) {
    for (const selectedId of arrToCheck) {
      if (selectedId === id) {
        return true
      }
    }
    return false
  }

  checkUncheckCategory(isChecked, id, arrToCheck, action) {

    if (isChecked) {
      //need to add to state
      let newCategories = [...arrToCheck];
      newCategories.push(id);
      if (action === 'delete') {
        this.setState({deleteSelectedLocs: newCategories})
      }  else {
        this.setState({selectedCategories: newCategories})
      }
    } else {
      //need to remove from state
      let newCategories = arrToCheck.filter((catId) => catId !== id);
      if (action === 'delete') {
        this.setState({deleteSelectedLocs: newCategories});
      }else {
        this.setState({selectedCategories: newCategories})
      }
    }
  }

  addLocationClickHandler() {
    if (this.state.nameInput !== '' && this.state.addressInput !== '' && this.state.selectedCategories.length > 0 && this.state.lonInput !== '' && this.state.latInput !== '' ) {
      this.props.addLocation(this.state.nameInput, this.state.addressInput, this.state.selectedCategories, this.state.latInput, this.state.lonInput);
      this.setState({
        selectedCategories: [],
        nameInput: '',
        addressInput: '',
        catInput: '',
        latInput: '',
        lonInput: ''
      });
      this.props.initBar()
    } else  {
      this.setState({showError: true})
    }

  }

  showError() {
    if (this.state.showError) {
      return <div className={'location-error'}>*Please fill all fields (and select minimum one category)</div>
    }
  }

  addLocationView() {
    return (
      <div className={'add-location-container'}>
        <input className={'add-loc-input'} onChange={(e) => this.setState({nameInput: e.target.value})} type="text"
               placeholder={'Name'}/>
        {this.props.cat.map((category) => {
          return <label className={'cat-list'} key={category.id}>
            <input type='checkbox'
                   checked={this.isCatChecked(category.id, this.state.selectedCategories)}
                   onChange={(e) => this.checkUncheckCategory(e.target.checked, category.id, this.state.selectedCategories)}
            />
            {category.name}</label>
        })}
        <input className={'add-loc-input'} onChange={(e) => this.setState({addressInput: e.target.value})} type="text"
               placeholder={'Address'}/>
        <input className={'add-loc-input'} onChange={(e) => this.setState({latInput: e.target.value})} type="text"
               placeholder={'Latitude'}/>
        <input className={'add-loc-input'} onChange={(e) => this.setState({lonInput: e.target.value})} type="text"
               placeholder={'Longitude'}/>
        {this.showError()}
        <div className={'btn add-loc-btn'} onClick={() => this.addLocationClickHandler()}>Add</div>
      </div>
    )
  }

  createView() {
    if (this.props.bar.isView || this.props.bar.isEdit) {
      return (
        <ul className={'locations-list'}>
          {this.props.loc.map((location) => <Loaction key={location.id}
                                                      location={location}/>)}
        </ul>
      )
    } else if (this.props.bar.isAdd) {
      return this.addLocationView()
    } else if (this.props.bar.isDelete) {
      {
        return this.deleteDisplayer()
      }
    }
  }

  componentDidMount() {
    this.props.initBar();
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
    },
    deleteLocations(locArr) {
      return dispatch({
        type: 'DELETE_LOCATIONS',
        locArr
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
