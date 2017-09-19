import React from 'react'
import Topbar from "../Topbar/Topbar";

export default class Locations extends React.Component{
  constructor(){
    super();
  }

  render() {
    return(
      <div>
        <Topbar title={'Locations'}/>
        <h1>Location compnent!!!</h1>
      </div>
    )
  }
}
