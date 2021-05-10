import "../styles/taskEdit.scss";
import { useEffect, useState } from "react";
import StatusLineDetailEdit from "./StatusLineDetailEdit";


export default function Task(props) {
  const { addTask, deleteTask, task } = props;

  
  const [tasks, setTasks] = useState([]);
  const [taskDetail, setTaskDetail] = useState([]);


  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
  const [collapsed,    setCollapsed   ] = useState(task.isCollapsed);
  const [formAction,   setFormAction  ] = useState("");

  useEffect(() => {
    callTaskDetailEdit();
   }, []);
   
  async function callTaskDetailEdit(){
    const response = await fetch(`http://localhost:3000/taskDetailTask/${task.orderCode}`);
    const json = await response.json();
    setTaskDetail(json); //Updating variable for task detail 
    setTasks(task); //Updating variable for task detail 
  }

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
          orderCode:  event.target.elements.orderCode.value,
          machineDet: event.target.elements.machineDet.value,
          activity:   event.target.elements.activity.value,
          customer:   event.target.elements.customer.value,
          urgency: urgencyLevel,
          status: task.status,
          isCollapsed: true,
          expectedShipping: event.target.elements.expectedShipping.value,
          shipping: event.target.elements.shipping.value,
          status_new: event.target.elements.status_new.value
        };
        //console.log(event);

        addTask(newTask);
          setCollapsed(true);
      }
    }

    if (formAction === "delete") {
      deleteTask(task.id);
    }
  }



///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// All details regarding status line detail edit 


console.log('checking on every step', taskDetail)

// Function for adding task details 
function addEmptyTaskDetail(status) {
  const lastTask = taskDetail[taskDetail.length - 1];

  let newTaskId = 1;

  if (lastTask !== undefined) {
    newTaskId = lastTask.id + 1;
  }

  setTaskDetail((taskDetail) => [
    ...taskDetail,
    {
      id: newTaskId,
      NoOfResource: "",
      hour: "",
      duration: "",
      department: "",
      status: status,
      orderCode: ""
    },
  ])  
}

console.log('taskdetail',taskDetail);


// Function for second table 
function addTaskDetail(taskToAdd) { 
  
  let filteredTasks = taskDetail.filter((task) => {
    return task.id !== taskToAdd.id;
  });

  let newTaskList = [...filteredTasks, taskToAdd];

  setTaskDetail(newTaskList);

  saveTaskDetailToLocalStorage(newTaskList);
}


// Function for storing task detail
function saveTaskDetailToLocalStorage(tasks) {
  localStorage.setItem("taskDetail", JSON.stringify(tasks));

  const orderCode = tasks[tasks.length-1].orderCode;

  tasks = tasks[tasks.length - 1];

  tasks = JSON.stringify(tasks);

  const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: tasks
    };

  fetch(`http://localhost:3000/taskDetail/${orderCode}`, requestOptions)
   .then(response => response.json());    
}


   console.log('task testing', task)
  return (
     <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
        <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}> 
        <label>Order Code</label>
        <input
          type="text"
          className="title input"
          name="orderCode"
          placeholder="Enter Order Code "
          disabled={collapsed}
          defaultValue={task.orderCode}
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

      <StatusLineDetailEdit
            taskDetail={taskDetail}
            addEmptyTask={addEmptyTaskDetail}
            addTaskDetail={addTaskDetail}
            // deleteTask={deleteTask}
            status="Create Task Activites"              
            tasks={tasks}
          />            

    </div>


  );
}

