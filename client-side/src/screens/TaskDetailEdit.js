import { useState } from "react";
import "../styles/taskDetailEdit.scss";

export default function TaskDetailEdit (props) {
    const { taskDetail, taskOrderCode } = props;
    
    //console.log('Add task detail', taskDetail);
    
    const [collapsed,  setCollapsed ] = useState(true);
    const [formAction, setFormAction] = useState("");
    
    
    //console.log('propies ', props);
    
  

    function addTaskDetailEdit(taskToAdd) {  

      // let filteredTasks = taskDetail.filter((task) => {
      //   return task.id !== taskToAdd.id;
      // });
  
      // let newTaskList = [...filteredTasks, taskToAdd];
  
      // setTaskDetail(newTaskList);
      //console.log('hai kya isme',taskToAdd);
      saveTaskDetailEditToLocalStorage(taskToAdd);
    }


    function saveTaskDetailEditToLocalStorage(tasks) {
      
      localStorage.setItem("taskDetail", JSON.stringify(tasks));
  
      tasks = JSON.stringify(tasks);
      
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: tasks
      };
  
      fetch(`http://localhost:3000/taskDetail/${taskOrderCode}`, requestOptions)
       .then(response => response.json());    
    }

    function updateTaskDetailEdit(tasks) {
      console.log('updateTaskDetailEdit',tasks)
      localStorage.setItem("taskDetail", JSON.stringify(tasks));
  
      //tasks = JSON.stringify(tasks);
      
      const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tasks)
      };
  
      fetch(`http://localhost:3000/taskDetail/${tasks.autoId}`, requestOptions)
       .then(response => {
          //response.json()
            console.log(response)
          }
       );   
       
      
    }
    
    function deleteTaskDetailEdit(autoId) {

     // console.log('deletion wala taskdetail',autoId);
  
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
  
      fetch(`http://localhost:3000/taskDetail/${autoId}`, requestOptions)
        .then(response => response.json())
        .then(window.location.reload(false));      
      };



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

        console.log(newTaskDetail.autoId);
        
        if (newTaskDetail.autoId === null){
          addTaskDetailEdit(newTaskDetail);
        } else {
          updateTaskDetailEdit(newTaskDetail)
        }
       
        setCollapsed(true);
        }
      }
  
      if (formAction === "delete") {
        deleteTaskDetailEdit(taskDetail.autoId);
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
