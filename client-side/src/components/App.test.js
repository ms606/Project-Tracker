import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import Adapter from "./setuptests";


import {
  BrowserRouter as Router,
  Switch, 
  Route,
  Link,
} from "react-router-dom";


it("renders without crashing", () => {
  shallow(<App />);
});

it("renders Account header", () => {
  const wrapper = shallow(<App />);
  const welcome =  <li>
		              <Link to="/display" className="linkdesign">Display</Link>
		              <Link to="/edit" className="linkdesign">Edit</Link>
		              <Link to="/" className="linkdesign">Home</Link>
		           </li>    ;

  expect(wrapper.contains(welcome)).toEqual(true);
});