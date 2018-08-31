import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron, Button, Nav, NavItem } from 'react-bootstrap';
import { Home } from './components/home.js'
import StockList from './components/stocks.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import logo from './logo.svg';
import './App.css';
import { getStocks } from "./api";

const App = () => (
    <Router>
      <div>
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Toggle />
            </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <IndexLinkContainer to='/'>
                <NavItem>
                  Home
                </NavItem>
              </IndexLinkContainer>
              <LinkContainer to='/stocks'>
                <NavItem>
                  StockList
                </NavItem>
              </LinkContainer>
            </Nav>
           </Navbar.Collapse>
          </Navbar>
        <Route exact path="/" component={Home} />
        <Route path='/stocks' component={StockList}/>
      </div>
    </Router>
);

export default App