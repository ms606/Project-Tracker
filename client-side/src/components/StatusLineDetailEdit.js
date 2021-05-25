import "../styles/statusLineEdit.scss";
import Task from "./TaskDetailEdit";

export default function StatusLineDetailEdit(props) {
  const { status, taskDetail, addTaskDetail, deleteTask, addEmptyTask, taskOrderCode } = props;

  let taskList, tasksForStatus;
  
  //console.log('fjhadskjfdsjklfhdasljfdsjaklhfljdksaf',props);

  function handleAddEmpty() {
    addEmptyTask(status);
  }



   if (taskDetail) {
  //   tasksForStatus = taskDetail.filter((task) => {
  //     console.log('looping task', task)
  //   return task.status === status;
        tasksForStatus = taskDetail;
  //   });
   }

  //console.log('props status line details',props);
  //console.log('taskOrderNoKewl',taskOrderCode);
 // console.log('tasksForStatus',tasksForStatus);
  
  if (tasksForStatus) {

    taskList = tasksForStatus.map((task) => {

      console.log('task testing', task)
      
      return (
 
        <Task
          addTaskDetail   = {(task) => addTaskDetail(task)}
          deleteTaskDetail= {(id)   => deleteTask(id)}
          key             = {task.autoId}
          taskDetail      = {task}
          taskOrderCode   = {taskOrderCode}
         // taskOrderCode   = {props.tasks[0].orderCode}
        />
      );
    });
  }

  return (
    <div className="statusLine">
      <h3>{status}</h3>
      {taskList}
      <button onClick={handleAddEmpty} className="button addTask">
        +
      </button>
    </div>
  );
}
