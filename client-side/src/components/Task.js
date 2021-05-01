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
          title: event.target.elements.title.value,
          description: event.target.elements.description.value,
          urgency: urgencyLevel,
          status: task.status,
          isCollapsed: true,
          expectedShipping: event.target.elements.expectedShipping.value,
          shipping: event.target.elements.shipping.value
        };


        console.log(event);

        addTask(newTask);
        setCollapsed(true);
      }
    }

    if (formAction === "delete") {
      deleteTask(task.id);
    }
  }

  return (
    <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
  
      <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
        <input
          type="text"
          className="title input"
          name="orderCode"
          placeholder="Enter Order Code "
          disabled={collapsed}
          defaultValue={task.title}
        />
        <input
          type="text"
          className="title input"
          name="machineDet"
          placeholder="Enter Machine Detail "
          disabled={collapsed}
          defaultValue={task.machineDet}
        />
        <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={task.title}
        />
        <textarea
          rows="2"
          className="description input"
          name="description"
          placeholder="Enter Activity"
          defaultValue={task.description}
        />
        
        <label className="title input">Select Expected Shipping</label>
        <input
          type="date"
         // className="title input"
          name="expectedShipping"
          placeholder="Select Expected Shipping"
          disabled={collapsed}
          defaultValue={task.expectedShipping}
          
        />

        <br />
        <label className="title input">Shipping</label>
        <input
          type="date"
         // className="title input"
          name="shipping"
          placeholder="Shipping"
          disabled={collapsed}
          defaultValue={task.expectedShipping}          
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

