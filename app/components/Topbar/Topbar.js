import React from 'react'
import {connect} from 'react-redux';

import './topbar.css'

class Topbar extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  isActive(actionIsActive) {
    return actionIsActive ? 'bar-active' : null
  }

  changeActiveView() {
    if (!this.props.isView) {
      this.props.activateView()
    }
  }

  changeActiveAdd() {
    if (!this.props.isAdd) {
      this.props.activateAdd();
    }
  }

  changeActiveEdit() {
    if (!this.props.isEdit) {
      this.props.activateEdit();
    }
  }

  changeActiveDelete() {
    if (!this.props.isDelete) {
      this.props.activateDelete();
    }
  }

  render() {

    return (
      <div className={'topbar-container'}>
        <h2 className={'bar-title'}>{this.props.title}</h2>
        <ul className={'action-list'}>
          <li onClick={() => this.changeActiveView()} className={this.isActive(this.props.bar.isView)}>View</li>
          <li onClick={() => this.changeActiveAdd()} className={this.isActive(this.props.bar.isAdd)}>Add</li>
          <li onClick={() => this.changeActiveEdit()} className={this.isActive(this.props.bar.isEdit)}>Edit</li>
          <li onClick={() => this.changeActiveDelete()} className={this.isActive(this.props.bar.isDelete)}>Delete</li>
        </ul>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {

    activateAdd() {
      return dispatch({
        type: 'ACTIVE_ADD'
      })
    },
    activateView() {
      return dispatch({
        type: 'ACTIVE_VIEW'
      })
    },
    activateEdit() {
      return dispatch({
        type: 'ACTIVE_EDIT'
      })
    },
    activateDelete() {
      return dispatch({
        type: 'ACTIVE_DELETE'
      })
    }
  }


}

function mapStateToProps(stateData) {
  return {
    bar: stateData.bar
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
