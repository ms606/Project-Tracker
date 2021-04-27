import { useState, useEffect } from "react";
import "../styles/App.scss";
import StatusLine from "./StatusLine";
import {
  BrowserRouter as Router,
  Switch, 
  Route,
  Link
} from "react-router-dom";



function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

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
        title: "",
        description: "",
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

  function moveTask(id, newStatus) {
    let task = tasks.filter((task) => {
      return task.id === id;
    })[0];

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    task.status = newStatus;

    let newTaskList = [...filteredTasks, task];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }

  // To change displays
  function Display(tasks){
    
    return(
      <div>
        <h2>View Everything</h2>
        <div>
           {tasks.tasks.map((task) => (
            <div key={task.id}> 
              <p>{task.orderCode}</p>
              <p>{task.title}</p>
              <p>{task.urgency}</p>
              <p>{task.machineDet}</p>
              <p>{task.expectedShipping}</p>
              <p>{task.shipping}</p>
            </div> 
          )) }
 
        </div>
      </div>
    )
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
            moveTask={moveTask}
            status="Create Task"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Detail"
          />
         
        </section>
      </main>



    

<Router>
<div>
  <ul>
    <li>
      <Link to="/display" className="linkdesign">Display</Link>
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
      <Display 
        tasks={tasks}
      /> 
    </Route>
  </Switch>
</div>
</Router>

</div>

  );

  
}

export default App;
