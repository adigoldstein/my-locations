import React from 'react';
import {connect} from 'react-redux';

import Loaction from '../location/Location';

class LocByCat extends React.Component {
  constructor() {
    super();
    this.state = {
      filteredByCat: [],
      isVisible: false
    }
  }


  filterLocations() {

    let filterdLocs = [];
    this.props.loc.map((location) => {
      for (const locId of location.cat) {
        if (locId === this.props.category.id) {
          filterdLocs.push(location)
        }
      }
    });
    this.setState({filteredByCat: filterdLocs})
  }

  showHideLocationUl() {
    if (this.state.isVisible) {
      return (
        <ul className={'locations-list'}>
          {this.state.filteredByCat.map((location) => <Loaction key={location.id}
                                                                location={location}/>)}
        </ul>
      )
    }
  }

  componentDidMount() {
    this.filterLocations()
  }

  render() {
    return (
      <div className={'sort-by-cat-container'}>
        <h2 onClick={()=> this.setState({isVisible: !this.state.isVisible})}>{this.props.category.name}</h2>
        {this.showHideLocationUl()}
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
    loc: stateData.locData
    // bar: stateData.bar
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocByCat);
