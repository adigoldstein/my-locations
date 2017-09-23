import React from 'react'
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';

import Categories from "../categories/Categories";
import Locations from "../locations/Locations";
import './root.css'


export default class Root extends React.Component {
  constractor() {
    Super();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <div className={'content'}>
              <h1>MyLocation</h1>
              <Switch>
                <Route exact path="/" component={() =>
                  <Redirect to="/categories"/>
                }/>
                <Route exact path="/categories" render={() => <Categories/>}/>
                <Route exact path="/locations" render={() => <Locations/>}/>
              </Switch>
            </div>
            <ul className={'footer-menu'}>
              <li><NavLink to="/categories">Categories</NavLink></li>
              <li><NavLink to="/locations">Locations</NavLink></li>
            </ul>
          </div>
        </BrowserRouter>


      </div>
    )
  }
}
