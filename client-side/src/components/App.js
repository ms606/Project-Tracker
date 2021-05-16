import React from "react";
import { useState, useEffect } from "react";
import "../styles/App.scss";
import "../styles/displayTable.scss";
import StatusLine from "./StatusLine";
import StatusLineDetail from "./StatusLineDetail";
import StatusLineEdit from "./StatusLineEdit";

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
              <Link to="/edit" className="linkdesign">Edit</Link>
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
            <Route path="/edit">
              <Edit />
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
        shipping: "",
        status_new: ""
      },
    ]);
  }

  function addTask(taskToAdd) {

    console.log('taskToAdd puranay tasks 1',taskToAdd);

     //loadTasksFromLocalStorage();

     //let loadedTasks = localStorage.getItem("tasks");

     //let tasks = JSON.parse(loadedTasks);
     let tasks = [];
     tasks.push(taskToAdd);
     console.log('after parsing tasks 1',tasks);


    //console.log('taskToAdd puranay tasks 2',tasks);
    //console.log('taskToAdd',taskToAdd);

    let filteredTasks = tasks.filter((task) => {
      console.log('task id ',task);
      return task.id !== taskToAdd.id;
    });

    // console.log('filtered list ',filteredTasks);

     let newTaskList = [...filteredTasks, taskToAdd];

    setTasks(newTaskList);

    //setTasks(taskToAdd);

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
        orderCode: "",
        startDate: "",
        endDate: "",
        autoId: ""
      },
    ])

    console.log('taskdetail',taskDetail);
    
  }

  // Function for second table 
  function addTaskDetail(taskToAdd) {  
    let filteredTasks = taskDetail.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    let newTaskList = [...filteredTasks, taskToAdd];

    setTaskDetail(newTaskList);

    saveTaskDetailToLocalStorage(newTaskList);
  }


  // Function deleteDetailTasks
  function deleteTaskDetail(taskId) {

    
    console.log('idher restslkjsdakldjjkllsdjsdjfsdlfjlkj', (taskId-1));   

   // taskDetail = JSON.stringify(taskDetail);
   // console.log('idher phunch poori detail k sath', taskDetail);
  //  taskDetail = taskDetail.substring(1, taskDetail.length-1);

     const requestOptions = {
       method: 'DELETE',
       headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(taskId)
     };

     fetch(`http://localhost:3000/taskDetail/${taskId}`, requestOptions)
       .then(response => response.json());

    console.log('deletion wala taskdetail',taskDetail);

    let filteredTasks = taskDetail.filter((task) => {
      return task.autoId !== taskId;  // jo id ayi hai us ko chor k new array create ker dega 

    });

    setTaskDetail(filteredTasks);

    localStorage.setItem("taskDetail", JSON.stringify(filteredTasks));

    //saveTaskDetailToLocalStorage(filteredTasks);


  }

  // Function for storing task detail  
  function saveTaskDetailToLocalStorage(tasks) {
     
    if (tasks.length > 1 ){
      console.log('task111werwrewwerrerrr')
      console.log('task111',tasks)
      const orderCode = tasks[tasks.length-1].orderCode;
            
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tasks[tasks.length-1])
      };
             
      var obj; 
       
      fetch(`http://localhost:3000/taskDetail/${orderCode}`, requestOptions)
       .then(response => response.json())
       .then(data => {
                      console.log(data);
                      tasks[tasks.length-1].autoId = data;
                      taskDetail[taskDetail.length-1].autoId = data;
                      localStorage.setItem("taskDetail", JSON.stringify(tasks)); 
                      } );                       
  }
    else {
      console.log('task111')
    console.log('task111',tasks)
    const orderCode = tasks[0].orderCode;
   
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(tasks[0])
    };
    
    var obj; 

    fetch(`http://localhost:3000/taskDetail/${orderCode}`, requestOptions)
     .then(response => response.json())
     .then(data => {
                    console.log(data);
                    tasks[tasks.length-1].autoId = data;
                    taskDetail[taskDetail.length-1].autoId = data;
                    localStorage.setItem("taskDetail", JSON.stringify(tasks)); 
                  } );                       

    }    
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
            deleteTaskDetail={deleteTaskDetail}
            status="Create Task Activites"              
            tasks={tasks}
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
    //   Promise.all([
    //     fetch("http://localhost:3000/taskEverything")
    //      .then(res => res.json())        
    //   ]).then(([urlOneData]) => {
    //     this.setState({ apiResponse: urlOneData })
    //   });

      const response = await fetch("http://localhost:3000/taskEverything/1");
      const json = await response.json();
      this.setState({ apiResponse: json });


     }

      //  const response = await fetch("http://localhost:3000/taskEverything");
      //  const json = await response.json();
      //  this.setState({ apiResponse: json });      
  

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
              <th>department</th>  
              <th>Urgency</th>
              <th>Machine Detail</th>
              <th>Expected Shipping</th>
              <th>Shipping</th>              
              <th>Resource</th>  
              <th>No Of Resource</th>  
              <th>hour</th>  
              <th>duration</th>  
              
            </thead>

            <tbody>
               {Arr[0].map((task) => 
                 <tr key={task.id}>  
                    <td>{task.orderCode}</td>
                    <td>{task.customer}</td>
                    <td>{task.activity}</td>
                    <th>{task.department}</th>                      
                    <td>{task.urgency}</td>
                    <td>{task.machineDet}</td>
                    <td>{task.expectedShipping}</td>
                    <td>{task.shipping}</td>
                    <td>{task.resource}</td>
                    <th>{task.NoOfResource}</th>  
                    <th>{task.hour}</th>  
                    <th>{task.duration}</th>                      
                 </tr>                   
               )
               }
            </tbody>  
            </table> 
            </div>
      )
    }
}
















// To Edit 
function Edit(){

  const [tasks, setTasks] = useState([]);
  const [apiData, apiResponseData] = useState({});
  const [taskDetail, setTaskDetail] = useState([]);

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

  function deleteTaskEdit(taskId) {

    console.log('deletion wala taskdetail',taskId);

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(`http://localhost:3000/tasks/${taskId}`, requestOptions)
      .then(response => response.json());

   


    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(filteredTasks);

    saveTasksToLocalStorage(filteredTasks);
  }

    function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  async function loadTasksFromLocalStorage() {
    
     const response = await fetch("http://localhost:3000/tasks");
     const json = await response.json();
     console.log('json edit', json);

     const Arr = [];

     Arr.push(json);

     apiResponseData(json);
    
     //console.log('Api Data array', Arr);

     //console.log('Api Data', apiData);

    let loadedTasks = localStorage.getItem("tasks");

    //let tasks = JSON.parse(loadedTasks);

    //console.log('Editing Calling', tasks);

    //if (tasks) {
      await setTasks(json);
    //}
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
        orderCode: "",
        startDate: "",
        endDate: "",
        autoId: ""
      },
    ])

    //console.log('taskdetail',taskDetail);
    
  }


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

    //console.log('tasks gen ', tasks);
    //console.log('length by len', tasks[tasks.length-1]);
    //Saving into the database mySql
    //console.log('saveTaskDetailToLocalStorage', tasks[0]);
    const orderCode = tasks[tasks.length-1].orderCode;


    //console.log('length tasks',tasks.length);

    tasks = tasks[tasks.length - 1];
    //if ((tasks[tasks.length-1]) > 0 ){
      //tasks = JSON.stringify(tasks[tasks.length-1]);
      //console.log('JSON.stringify', JSON.stringify(tasks[tasks.length-1]));
    //}
    //else {
      tasks = JSON.stringify(tasks);
     // console.log('JSON.stringify', JSON.stringify(tasks));
    //}

    //tasks = tasks.substring(1, tasks.length-1);

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: tasks
    };

    fetch(`http://localhost:3000/taskDetail/${orderCode}`, requestOptions)
     .then(response => response.json());    
  }



  return (
    <div className="App">
      <h1>Task Management</h1>
      <main>
        <section>
          <StatusLineEdit
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTaskEdit={deleteTaskEdit}
            status="Edit Task"
          />

        
        </section>
      </main>
    </div>
  );
}


export default App;