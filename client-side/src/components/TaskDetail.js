import { useState } from "react";

export default function TaskDetail (props) {
    const { addTask, deleteTask, task } = props;

    const [collapsed, setCollapsed] = useState(task.isCollapsed);
    const [formAction, setFormAction] = useState("");
  

    function handleSubmit(event) {
      event.preventDefault();
  
      if (formAction === "save") {
        if (collapsed) {
          setCollapsed(false);
        } else {
        
        let newTaskDetail = {
           id: task.id,
           // orderCode: event.target.elements.orderCode.value,
            resource: event.target.elements.resource.value,
            NoOfResource : event.target.elements.NoOfResource.value,
            hour: event.target.elements.hour.value,
            duration: event.target.elements.duration.value,
            department: event.target.elements.department.value
        };
    
          console.log('lala',event);
  
          addTask(newTaskDetail);
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
            //className="title input"
            name="resource"
            placeholder="Enter Resource."
            disabled={collapsed}
            defaultValue={task.resource}
          />

          <input
            type="text"
            //className="title input"
            name="NoOfResource"
            placeholder="Number Of Resource "
            disabled={collapsed}
            defaultValue={task.NoOfResource}
          />

          <input
            type="text"
           // className="title input"
            name="hour"
            placeholder="Enter Hour"
            disabled={collapsed}
            defaultValue={task.hour}
          />
          
          <input
            type="number"
           // className="title input"
            name="duration"
            placeholder="Enter Duration"
            disabled={collapsed}
            defaultValue={task.duration}
          />

          <input
            type="text"
           // className="title input"
            name="department"
            placeholder="Enter Department"
            disabled={collapsed}
            defaultValue={task.department}
          />

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
