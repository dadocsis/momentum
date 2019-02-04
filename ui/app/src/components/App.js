import React, { Component } from 'react';
import Home from '../containers/Home.js'
import StockList from './stocks.js'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import oAuthLanding from "../components/oauthLanding";

const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
    exact: true
  },
  {
    path: "/oAuth",
    component: oAuthLanding,
    name: "Auth Landing",
    exact: true
  },
  {
    path: "/stocks",
    component: StockList,
    name: "Watch List",
    exact: true,
    secure: true
  }];

const App = (props) => (
    <Router>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-1 navbar-expand-lg">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/stocks">Watch List</NavLink>
                </li>
            </ul>
          </div>
        </nav>
          {
            routes.map((r, i) => {
                let state = props;
                return (
                    <Route key={i}
                           exact={r.exact}
                           path={r.path}
                           render={props => {
                               if (r.secure && !state.authUser.token){
                                    return <Redirect to='/'/>
                                }
                               return <r.component {...props} {...state}/>
                            }}
                     />
                )
            })
          }
      </div>
    </Router>
);

export default App