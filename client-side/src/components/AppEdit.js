import React from "react";
import { useState, useEffect } from "react";
import "../styles/App.scss";
import StatusLineEdit from "./StatusLineEdit";


// To Edit 
function Edit(){

    const [tasks, setTasks] = useState([]);
    const [apiData, apiResponseData] = useState({});
    const [taskDetail, setTaskDetail] = useState([]);
  
    useEffect(() => {
  
     loadTasksFromLocalStorage();
  
    }, []);
  
  
    function updateTask(taskToAdd) {
      // let filteredTasks = tasks.filter((task) => {
      //   return task.orderCode !== taskToAdd.orderCode;
      // });
  
      // let newTaskList = [...filteredTasks, taskToAdd];
  
      // setTasks(newTaskList);
  
      updateStorage(taskToAdd);
    }
  
    function deleteTaskEdit(taskId) {
  
      //console.log('deletion wala taskdetail',taskId);
  
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
  
      fetch(`http://localhost:3000/tasks/${taskId}`, requestOptions)
        .then(response => response.json());
   
      let filteredTasks = tasks.filter((task) => {
        return task.id !== taskId;
      });
     // setTasks(filteredTasks);  
     // saveTasksToLocalStorage(filteredTasks);
    }
  
      function updateStorage(tasks) {
       
       localStorage.setItem("tasks", '');
       localStorage.setItem("tasks", JSON.stringify(tasks));

        const requestOption = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tasks)
        };
  
        fetch(`http://localhost:3000/tasks/${tasks.id}`, requestOption)
          .then(response => response.json())
        }
  
  
    async function loadTasksFromLocalStorage() {      
       const response = await fetch("http://localhost:3000/tasks");
       const json = await response.json();
       //console.log('json edit', json);
  
       const Arr = [];
  
       Arr.push(json);
  
       //apiResponseData(json);
      
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
    function addTaskDetailEdit(taskToAdd) {  
      let filteredTasks = taskDetail.filter((task) => {
        return task.id !== taskToAdd.id;
      });
  
      let newTaskList = [...filteredTasks, taskToAdd];
  
      setTaskDetail(newTaskList);
  
      saveTaskDetailToLocalStorage(newTaskList);
    }



    function saveTaskDetailToLocalStorage(tasks){
      localStorage.setItem("taskDetail", JSON.stringify(tasks));

    }
  
    // Function for storing task detail
    
    function saveTaskDetailEditToLocalStorage(tasks) {
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
              updateTask={updateTask}
              deleteTaskEdit={deleteTaskEdit}
              status="Edit Task"
            />          
          </section>
        </main>
      </div>
    );
  }


  export default Edit