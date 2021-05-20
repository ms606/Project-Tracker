import { useState } from "react";

export default function TaskDetailEdit (props) {
    const { addTaskDetail, deleteTaskDetail, taskDetail, taskOrderCode } = props;
    
    //console.log('Add task detail collapsed', taskDetail);
    //console.log('Delete task detail logging',deleteTaskDetail);

    const [collapsed,  setCollapsed ] = useState(taskDetail.isCollapsed);
    const [formAction, setFormAction] = useState("");
    
    //console.log('Add task', taskDetail.isCollapsed);
    console.log('propies ', props);
    //console.log('propies detials', taskOrderCode);

    function handleSubmit(event) {
      event.preventDefault();
  
      if (formAction === "save") {
        if (collapsed) {
          setCollapsed(false);
        } else {
        
        let newTaskDetail = {
            id: taskDetail.id,
            orderCode: taskOrderCode,
            isCollapsed: true,
            status: taskDetail.status,
            resource: event.target.elements.resource.value,
            NoOfResource: event.target.elements.NoOfResource.value,
            hour: event.target.elements.hour.value,
            duration: event.target.elements.duration.value,
            department: event.target.elements.department.value,
            autoId: taskDetail.autoId
        };
    
        addTaskDetail(newTaskDetail);
        setCollapsed(true);
        }
      }
  
      if (formAction === "delete") {
        deleteTaskDetail(taskDetail.id);
      }
    }
  
    return (
      <div >
        {/* //className={`task ${collapsed ? "collapsedTask" : ""}`}> */}
    
        <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>

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
          />

         

          <button
            onClick={() => {
              setFormAction("save");
            }}
            className="button"
          >
            {collapsed ? "Edit" : "Save"}
          </button>
          <hr />
          <hr />
          <hr />


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
