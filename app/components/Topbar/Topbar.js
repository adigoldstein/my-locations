import React from 'react'
import {connect} from 'react-redux';

import './topbar.css'

 class Topbar extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    console.info(this.props.bar);
    return (
      <div>
        <ul>
          <li>View</li>
          <li>Add</li>
          <li>Edit</li>
          <li>Delete</li>
        </ul>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // addTotoReducer(id, text){
    //   return dispatch({
    //     type: 'ADD_TODO',
    //     id,
    //     text
    //   })
    // }
  }
}

function mapStateToProps(stateData) {
  return {
    bar: stateData.bar
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
