import React from 'react'
import {connect} from 'react-redux';

 class Categories extends React.Component{
  constructor(){
    super();
    this.state = {
    }
  }

  render() {
    return(
      <div>
        <h1>Category compnent!!!</h1>
        {this.props.cat.map((category)=> {
          console.info(category.name);
        })}
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
    cat: stateData.catData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
