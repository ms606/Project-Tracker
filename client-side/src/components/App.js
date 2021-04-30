import { useState, useEffect } from "react";
import "../styles/App.scss";
import "../styles/displayTable.scss";
import StatusLine from "./StatusLine";
import StatusLineDetail from "./StatusLineDetail";
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

    console.log(tasks.tasks[0])

    return(
      <div id="notif">
        <h2>View Everything</h2>
        <div>
         {tasks.tasks.map((task) => (
           <tr key={task.id}> 
            <td>{task.orderCode}</td>
            <td>{task.title}</td>
            <td>{task.urgency}</td>
            <td>{task.machineDet}</td>
            <td>{task.expectedShipping}</td>
            <td>{task.shipping}</td>
           </tr>               
          ))}                             
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
            status="Create Task"
          />
        </section>

        <StatusLineDetail
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            status="Create Task Activites"
          />         
   
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
