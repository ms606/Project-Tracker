import "../styles/task.scss";
import { useState } from "react";

export default function Task(props) {
  const { addTask, deleteTask, task } = props;

  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
  const [collapsed,    setCollapsed   ] = useState(task.isCollapsed);
  const [formAction,   setFormAction  ] = useState("");

  function setUrgency(event) {
    setUrgencyLevel(event.target.attributes.urgency.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formAction === "save") {
      if (collapsed) {
        setCollapsed(false);
      } else {
        let newTask = {
          id: task.id,
          orderCode: event.target.elements.orderCode.value,
          machineDet: event.target.elements.machineDet.value,
          activity: event.target.elements.activity.value,
          customer: event.target.elements.customer.value,
          urgency: urgencyLevel,
          status: task.status,
          isCollapsed: true,
          expectedShipping: event.target.elements.expectedShipping.value,
          shipping: event.target.elements.shipping.value,
          status_new: event.target.elements.status_new.value
        };        

        addTask(newTask);
          setCollapsed(true);
      }
    }

    if (formAction === "delete") {
      deleteTask(task.orderCode);
    }
  }

  return (
    <div className="task">
      {/* <div className={`task ${collapsed ? "collapsedTask" : ""}`}> */}
      <form onSubmit={handleSubmit} >
      {/* <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}> */}
        <label>Order Code</label>
        <input
          type="text"
          className="title input"
          name="orderCode"
          placeholder="Enter Order Code "
          disabled={collapsed}
          defaultValue={task.title}
        />
        <br />
        <label>Enter Customer</label>
        <input
          type="text"
          className="description input"
          name="customer"
          placeholder="Enter Customer"
          defaultValue={task.customer}
        />
        <br />
        <label>Enter Machine Detail</label>
        <input
          type="text"
          className="title input"
          name="machineDet"
          placeholder="Enter Machine Detail "
          disabled={collapsed}
          defaultValue={task.machineDet}
        />

        <br />

        <label>Enter Activity</label>
        <input
          type="text"
          className="title input"
          name="activity"
          placeholder="Enter Activity"
          disabled={collapsed}
          defaultValue={task.activity}
        />

        <br />

        <label>Enter Status</label>
        <input
          type="text"
          className="title input"
          name="status_new"
          placeholder="Enter Status"
          disabled={collapsed}
          defaultValue={task.status_new}          
        />

        <br />

        <label>Select Expected Shipping</label>
        <input
          type="date"
          className="title input"
          name="expectedShipping"
          placeholder="Select Expected Shipping"
          disabled={collapsed}
          defaultValue={task.expectedShipping}          
        />

        <br />
        <label>Shipping</label>
        <input
          type="date"
          className="title input"
          name="shipping"
          placeholder="Shipping"
          disabled={collapsed}
          defaultValue={task.shipping}          
        />

        <br />

        
        <div className="urgencyLabels">
          <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
            <input
              urgency="low"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            low
          </label>
          <label
            className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}
          >
            <input
              urgency="medium"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            medium
          </label>
          <label
            className={`high ${urgencyLevel === "high" ? "selected" : ""}`}
          >
            <input
              urgency="high"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            high
          </label>
        </div>
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
  );
}

