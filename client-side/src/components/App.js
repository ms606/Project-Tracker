import React from "react";
import { useState, useEffect } from "react";
import "../styles/App.scss";
import "../styles/displayTable.scss";



import Home from './AppHome'
import Edit from './AppEdit'
import Display from './AppDisplay'


import {
  BrowserRouter as Router,
  Switch, 
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (              
        <Router>
        <div>
          <ul>
            <li>
              <Link to="/display" className="linkdesign">Display</Link>
              <Link to="/edit" className="linkdesign">Edit</Link>
              <Link to="/" className="linkdesign">Home</Link>
            </li>    
          </ul>

          <hr />

          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route path="/display">
              <Display /> 
            </Route>
            <Route path="/edit">
              <Edit />
            </Route>
            <Route path="/">
              <Home />              
            </Route>
          </Switch>
        </div>
        </Router>
  )
}

export default App;