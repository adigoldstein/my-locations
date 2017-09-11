import React from 'react'
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';

import Categories from "../categories/categories";
import Locations from "../locations/Locations";
import Topbar from "../Topbar/Topbar";

export default class Root extends React.Component {
  constractor() {
    Super();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <h1>MyLocation</h1>
            <Topbar/>
            <Switch>
              <Route exact path="/" component={() =>
                <Redirect to="/categories"/>
              }/>
              <Route exact path="/categories" render={() => <Categories/>}/>
              <Route exact path="/locations" render={() => <Locations/>}/>
            </Switch>
            <ul>
              <li><NavLink to="/categories">Categories</NavLink></li>
              <li><NavLink to="/locations">Locations</NavLink></li>
            </ul>
          </div>
        </BrowserRouter>


      </div>
    )
  }
}
