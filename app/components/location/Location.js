import React from 'react'
import {connect} from 'react-redux';
import { compose } from "recompose";
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
      isMap : false
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
        defaultCenter={{ lat: this.props.location.coordinates.lat, lng: this.props.location.coordinates.lon }}
      >
        <Marker
          position={{ lat: this.props.location.coordinates.lat, lng: this.props.location.coordinates.lon }}
        />
      </GoogleMap>
    );
    if (this.state.isMap) {
      return (
        <div>
          <div onClick={()=> this.setState({isMap: false})} className={'btn hide-show-map-btn'}>Hide map</div>
          <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCX1Jda5k-1j67hqQK5d6RlwaLmT7l6nCw&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      )
    } else {
      return (
        <div onClick={()=> this.setState({isMap: true})} className={'btn hide-show-map-btn'}>
          Show in map
        </div>
      )
    }
  }

  categoryView() {
    let catName = '';
    this.props.location.cat.map((categoty)=> {
     for (const catId of this.props.cat) {
       if (catId.id === categoty) {
         catName += catId.name + ', ';
       }
     }
    })
    return <div>Category : {catName}`</div>
  }

  render() {

    return (
      <li>
        <div>Name: {this.props.location.name}</div>
        {this.categoryView()}
        <div>Address:{this.props.location.address}</div>
        <h3>Coordinates:</h3>
        <div>{this.props.location.coordinates.lat}</div>
        <div>{this.props.location.coordinates.lon}</div>
        {this.mapDisplayer()}

      </li>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // initBar() {
    //   return dispatch({
    //     type: 'INIT_BAR',
    //   })
    // }

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
