import React from 'react';
import {connect} from 'react-redux';

import Loaction from '../location/Location';
import './locByCat.css'

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
        <div>
          {this.noLocsInCatMsg()}
        <ul className={'locations-list'}>
          {this.state.filteredByCat.map((location) => <Loaction key={location.id}
                                                                location={location}/>)}
        </ul>
        </div>
      )
    }
  }

  noLocsInCatMsg() {

    return this.state.filteredByCat.length === 0 ? <div className={'no-loc-to-show'}>No locations in this category yet...</div> : null;
  }

  componentDidMount() {

    this.filterLocations()
  }

  render() {

    return (
      <div className={'sort-by-cat-container'}>
        <h2 className={'cat-header'} onClick={()=> this.setState({isVisible: !this.state.isVisible})}>{this.props.category.name}<i className={"arrow down"}></i></h2>

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
    }
  }
}

function mapStateToProps(stateData) {
  return {
    loc: stateData.locData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocByCat);
