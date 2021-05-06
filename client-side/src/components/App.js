import React from "react";
import { useState, useEffect } from "react";
import "../styles/App.scss";
import "../styles/displayTable.scss";
import StatusLine from "./StatusLine";
import StatusLineDetail from "./StatusLineDetail";
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
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        </Router>
  )
  
}


function Home() {
  
  
  const [tasks, setTasks] = useState([]);
  const [taskDetail, setTaskDetail] = useState([]);

  // useEffect(() => {
  //   loadTasksFromLocalStorage();
  // }, []);

  function addEmptyTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        customer: "",
        activity: "",
        urgency: "",
        status: status,
        orderCode: "",
        machineDet: "",
        expectedShipping: "",
        shipping: ""
      },
    ]);
  }

  function addTask(taskToAdd) {  
    
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    let newTaskList = [...filteredTasks, taskToAdd];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);

    }


  function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(filteredTasks);

    saveTasksToLocalStorage(filteredTasks);
  }


  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    tasks = JSON.stringify(tasks);
    tasks = tasks.substring(1, tasks.length-1);

    console.log(tasks);
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: tasks
    };

    fetch(`http://localhost:3000/tasks`, requestOptions)
      .then(response => response.json());


  }


  function loadTasksFromLocalStorage() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }


 
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
        taskOrderCode: "", 
      },
    ])
    
  }


  // Function for second table 
  function addTaskDetail(taskToAdd) {  
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    let newTaskList = [...filteredTasks, taskToAdd];

    setTaskDetail(newTaskList);

    saveTaskDetailToLocalStorage(newTaskList);

  }

  // Function for storing task detail
  
  function saveTaskDetailToLocalStorage(tasks) {
    localStorage.setItem("taskDetail", JSON.stringify(tasks));

    //Saving into the database mySql
    tasks = JSON.stringify(tasks);
    tasks = tasks.substring(1, tasks.length-1);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: tasks
    };

    fetch(`http://localhost:3000/taskDetail/852`, requestOptions)
      .then(response => response.json());     
  
  }

  return (
    <div className="App">
      <h1>Project Activities</h1>
      <main>
        <section>
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            status="Create Task"
          />
        </section>

          <StatusLineDetail
              taskDetail={taskDetail}
              addEmptyTask={addEmptyTaskDetail}
              addTaskDetail={addTaskDetail}
              deleteTask={deleteTask}
              status="Create Task Activites"
          />         
   
      </main>

      </div>
  );
}


 // To change displays
 class Display extends React.Component{

  constructor(props) {
      super(props);
      this.state = { apiResponse: [] };
    }
  

    async componentDidMount() {
      const response = await fetch("http://localhost:3000/tasks");
      const json = await response.json();
      this.setState({ apiResponse: json });
    }

    render() {
      
      const Arr = [];

      Arr.push(this.state.apiResponse);
      
      return (
            <div>
            <table>
            <thead>
              <th>Order Code</th>
              <th>Customer</th> 
              <th>Activity</th>
              <th>Urgency</th>
              <th>Machine Detail</th>
              <th>Expected Shipping</th>
              <th>Shipping</th>              
            </thead>
            <tbody>

               {Arr[0].map((task) => 
                 <tr key={task.id}>  
                    <td>{task.orderCode}</td>
                    <td>{task.customer}</td>
                    <td>{task.Activity}</td>
                    <td>{task.urgency}</td>
                    <td>{task.machineDet}</td>
                    <td>{task.expectedShipping}</td>
                    <td>{task.shipping}</td>
                 </tr>                   
               )}
               </tbody>  
            </table> 
            </div>
      )
    }
}

export default App;