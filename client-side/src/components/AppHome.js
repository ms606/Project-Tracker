import { useState } from "react"
import StatusLine from "./StatusLine";
import StatusLineDetail from "./StatusLineDetail";

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
  
  export default Home;