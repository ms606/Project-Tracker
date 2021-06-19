import React from "react";
import { shallow, mount } from "enzyme";
import TaskDetail from "./TaskDetail";
import Adapter from "./setuptests";


import {
  BrowserRouter as Router,
  Switch, 
  Route,
  Link,
} from "react-router-dom";


it("renders without crashing", () => {
  shallow(<TaskDetail />);
});

it("renders Account header", () => {
  const wrapper = shallow(<TaskDetail />);

  console.log(wrapper.debug);


  const welcome =   <div >
        {/* //className={`task ${collapsed ? "collapsedTask" : ""}`}> */}
    
        <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
                
          <br />  
          <br />
          <input
            type="text"
            className="title input"
            name="department"
            placeholder="Enter Department"
            disabled={collapsed}
            defaultValue={taskDetail.department}
          />

          <input
            type="text"
            className="title input"
            name="resource"
            placeholder="Enter Resource."
            disabled={collapsed}
            defaultValue={taskDetail.resource}
          />

          <input
            type="text"
            className="title input"
            name="NoOfResource"
            placeholder="Number Of Resource "
            disabled={collapsed}
            defaultValue={taskDetail.NoOfResource}
          />

          <input
            type="text"
            className="title input"
            name="hour"
            placeholder="Enter Hour"
            disabled={collapsed}
            defaultValue={taskDetail.hour}
          />
          
          <input
            type="number"
            className="title input"
            name="duration"
            placeholder="Enter Duration"
            disabled={collapsed}
            defaultValue={taskDetail.duration}
            onChange={handleChangeDur}
          />

          <br />
          <label>Select Start Date      </label>
          <input
            type="date"
            className="title input"
            name="startDate"
            placeholder="Select Start Date"
            disabled={collapsed}
            defaultValue={taskDetail.startDate}
            onChange={handleChange}
          />
          
          <br />
          <label>Select End Date             </label>
          <input
            type="text"
            className="title input"
            name="endDate"
            placeholder="Select End Date"
            disabled={collapsed}
            //value={enddd}
            defaultValue={enddd}
          />
          
          <br />
          <br />
          <button
            onClick={() => {
              setFormAction("save");
            }}
            className="button"
          >
            {collapsed ? "Edit" : "Save"}
          </button>
          {collapsed && (
            <button
              onClick={() => {
                setFormAction("delete");
              }}
              className="button delete"
            >
              X
            </button>
          )}
        </form>
      </div> 

  expect(wrapper.contains(welcome)).toEqual(true);

   //expect(welcome).toBeCalledWith(expect.anything());

  //expect(wrapper.contains(welcome)).expect.anything();
});