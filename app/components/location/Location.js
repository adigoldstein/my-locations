import React from 'react'
import {connect} from 'react-redux';
import {compose} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import "./location.css"

class Location extends React.Component {
  constructor() {
    super();
    this.state = {
      isMap: false,
      viewEditFields: false,
      selectedCategories: [],
      nameInput: '',
      addressInput: '',
      latInput: '',
      lonInput: ''

    }
  }

  editLocClickHandler(e) {
    const editObj = this.props.loc.find((item) => e.target.id === item.id);
    console.info(editObj);
    this.setState({
      selectedCategories: editObj.cat,
      nameInput: editObj.name,
      addressInput: editObj.address,
      // catInput: editObj,
      latInput: editObj.coordinates.lat,
      lonInput: editObj.coordinates.lon
    }, this.setState({viewEditFields: true}))


  }

  editBtnDisplayer() {
    if (this.props.bar.isEdit) {
      return <div onClick={(e) => this.editLocClickHandler(e)} id={this.props.location.id}
                  className={'btn edit-loc-btn'}>Edit</div>
    }
  }

  mapDisplayer() {
    // map const data
    const MapWithAMarker = compose(
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{lat: this.props.location.coordinates.lat, lng: this.props.location.coordinates.lon}}
      >
        <Marker
          position={{lat: this.props.location.coordinates.lat, lng: this.props.location.coordinates.lon}}
        />
      </GoogleMap>
    );
    if (this.state.isMap) {
      return (
        <div>
          <div onClick={() => this.setState({isMap: false})} className={'btn hide-show-map-btn'}>Hide map</div>
          <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCX1Jda5k-1j67hqQK5d6RlwaLmT7l6nCw&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{height: `100%`}}/>}
            containerElement={<div style={{height: `400px`}}/>}
            mapElement={<div style={{height: `100%`}}/>}
          />
        </div>
      )
    } else {
      return (
        <div onClick={() => this.setState({isMap: true})} className={'btn hide-show-map-btn'}>
          Show in map
        </div>
      )
    }
  }

  categoryView() {
    let catName = '';
    this.props.location.cat.map((categoty) => {
      for (const catId of this.props.cat) {
        if (catId.id === categoty) {
          catName += catId.name + ', ';
        }
      }
    });
    const retStr = catName.slice(0, -2);
    return <div>Category : {retStr}</div>
  }

  saveChangesClickHandler() {
    this.props.editLocation(this.props.location.id,
      this.state.selectedCategories,
      this.state.nameInput,
      this.state.addressInput,
      this.state.latInput,
      this.state.lonInput);
    this.setState({ isMap: false,
      viewEditFields: false,
      selectedCategories: [],
      nameInput: '',
      addressInput: '',
      latInput: '',
      lonInput: ''});
    this.props.initBar()
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

  isCatChecked(catId) {
    for (const cat of this.state.selectedCategories) {
      if (cat === catId) {
        return true
      }
    }
    return false
  }

  catCheckboxDisplayer() {
    return this.props.cat.map((catItem) => {

      return (
        <div key={catItem.id}>
          <label><input onChange={(e) => this.checkUncheckCategory(e.target.checked, catItem.id)}
                        checked={this.isCatChecked(catItem.id)} type="checkbox"/>{catItem.name}</label>
        </div>
      )
    })
  }

  displayViewOrEdit() {
    if (this.state.viewEditFields) {
      return (
        <div>
          <input onChange={(e) => this.setState({nameInput: e.target.value})} type="text"
                 defaultValue={this.state.nameInput}/>
          <input onChange={(e) => this.setState({addressInput: e.target.value})} type="text"
                 defaultValue={this.state.addressInput}/>
          {this.catCheckboxDisplayer()}
          <input onChange={(e) => this.setState({latInput: e.target.value})} type="text"
                 defaultValue={this.state.latInput}/>
          <input onChange={(e) => this.setState({lonInput: e.target.value})} type="text"
                 defaultValue={this.state.lonInput}/>
          <div onClick={() => this.saveChangesClickHandler()} className={'btn save-loc-changes-btn'}>Save Canges</div>
        </div>
      )
    } else {
      return (
        <div>
          <div>Name: {this.props.location.name}</div>
          {this.categoryView()}
          <div>Address:{this.props.location.address}</div>
          <h3>Coordinates:</h3>
          <div>{this.props.location.coordinates.lat}</div>
          <div>{this.props.location.coordinates.lon}</div>
        </div>
      )
    }
  }

  render() {
    return (
      <li>
        {this.displayViewOrEdit()}
        {this.mapDisplayer()}
        {this.editBtnDisplayer()}


      </li>
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
    editLocation(id, selectedCategories, name, address, lat, lon) {
    return dispatch({
      type: 'EDIT_LOCATION',
      id,
      selectedCategories,
      name,
      address,
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

export default connect(mapStateToProps, mapDispatchToProps)(Location);
